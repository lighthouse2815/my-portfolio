import cors from "cors";
import express from "express";
import { addComment, getVisitorStats, listComments, recordVisit } from "./db.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAllOrigins = allowedOrigins.length === 0;

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowAllOrigins || !origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/visitors", async (_req, res, next) => {
  try {
    const visit = await recordVisit();
    const stats = await getVisitorStats();

    res.status(201).json({
      visit,
      ...stats,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/visitors/stats", async (req, res, next) => {
  try {
    const requestedDays = Number(req.query.days);
    const days = Number.isFinite(requestedDays) ? requestedDays : 7;
    const stats = await getVisitorStats(days);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

app.get("/api/comments", async (_req, res, next) => {
  try {
    const comments = await listComments();
    res.json({ comments });
  } catch (error) {
    next(error);
  }
});

app.post("/api/comments", async (req, res, next) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    const message = String(req.body?.message ?? "").trim();

    if (name.length < 2 || name.length > 40) {
      res.status(400).json({
        error: "Name must be between 2 and 40 characters.",
      });
      return;
    }

    if (message.length < 2 || message.length > 300) {
      res.status(400).json({
        error: "Message must be between 2 and 300 characters.",
      });
      return;
    }

    const comment = await addComment(name, message);
    res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    void next;
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  },
);

app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`);
});
