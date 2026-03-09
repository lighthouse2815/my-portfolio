import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSONFilePreset } from "lowdb/node";
import type {
  CommentRecord,
  DatabaseSchema,
  VisitorStats,
  VisitRecord,
} from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const dbPath = path.join(dataDir, "portfolio-db.json");

const defaultData: DatabaseSchema = {
  visits: [],
  comments: [],
};

await mkdir(dataDir, { recursive: true });

const db = await JSONFilePreset<DatabaseSchema>(dbPath, defaultData);

const isoDay = (value: string) => value.slice(0, 10);

const getLastDays = (days: number): string[] => {
  const now = new Date();
  const out: string[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    date.setUTCDate(now.getUTCDate() - i);
    out.push(date.toISOString().slice(0, 10));
  }

  return out;
};

const sortByNewest = <T extends { timestamp: string }>(items: T[]): T[] =>
  [...items].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

export const recordVisit = async (): Promise<VisitRecord> => {
  const visit: VisitRecord = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };

  db.data.visits.push(visit);
  await db.write();

  return visit;
};

export const getVisitorStats = async (days = 7): Promise<VisitorStats> => {
  const sanitizedDays = Math.max(1, Math.min(30, Math.floor(days)));
  const labels = getLastDays(sanitizedDays);
  const visits = db.data.visits;
  const counts = new Map<string, number>(labels.map((date) => [date, 0]));

  for (const visit of visits) {
    const day = isoDay(visit.timestamp);
    if (counts.has(day)) {
      counts.set(day, (counts.get(day) ?? 0) + 1);
    }
  }

  const latestVisit = sortByNewest(visits)[0]?.timestamp ?? null;

  return {
    total: visits.length,
    latestVisit,
    daily: labels.map((date) => ({
      date,
      count: counts.get(date) ?? 0,
    })),
  };
};

export const listComments = async (): Promise<CommentRecord[]> =>
  sortByNewest(db.data.comments);

export const addComment = async (
  name: string,
  message: string,
): Promise<CommentRecord> => {
  const item: CommentRecord = {
    id: crypto.randomUUID(),
    name,
    message,
    timestamp: new Date().toISOString(),
  };

  db.data.comments.push(item);
  await db.write();

  return item;
};
