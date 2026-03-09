export interface VisitRecord {
  id: string;
  timestamp: string;
}

export interface CommentRecord {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export interface DatabaseSchema {
  visits: VisitRecord[];
  comments: CommentRecord[];
}

export interface VisitorStats {
  total: number;
  latestVisit: string | null;
  daily: Array<{
    date: string;
    count: number;
  }>;
}
