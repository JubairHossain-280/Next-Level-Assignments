export interface IIssues {
  title: string;
  description: string;
  type: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
}

export type Sort = "newest" | "oldest";

export type Category = "bug" | "feature_request";

export type Status = "open" | "in_progress" | "resolved";

export interface IQueryParams {
  sort: "newest" | "oldest";
  category: "bug" | "feature_request";
  status: "open" | "in_progress" | "resolved";
}
