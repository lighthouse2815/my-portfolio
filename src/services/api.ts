import type { PortfolioComment, VisitorStats } from "../types";

const rawApiBase = (import.meta.env.VITE_API_BASE ?? "").trim();
const apiBase = rawApiBase
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

const parseJson = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(payload.error ?? "API request failed.");
  }

  return (await response.json()) as T;
};

export const registerVisit = async (): Promise<VisitorStats> => {
  const response = await fetch(`${apiBase}/api/visitors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return parseJson<VisitorStats>(response);
};

export const fetchVisitorStats = async (): Promise<VisitorStats> => {
  const response = await fetch(`${apiBase}/api/visitors/stats?days=7`);
  return parseJson<VisitorStats>(response);
};

export const fetchComments = async (): Promise<PortfolioComment[]> => {
  const response = await fetch(`${apiBase}/api/comments`);
  const payload = await parseJson<{ comments: PortfolioComment[] }>(response);
  return payload.comments;
};

export const submitComment = async (
  name: string,
  message: string,
): Promise<PortfolioComment> => {
  const response = await fetch(`${apiBase}/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, message }),
  });

  const payload = await parseJson<{ comment: PortfolioComment }>(response);
  return payload.comment;
};
