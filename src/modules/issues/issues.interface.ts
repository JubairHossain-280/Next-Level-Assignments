export interface IIssues {
  title: string;
  description: string;
  type: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
}

export type QueryParams = {
  sort: "newest" | "oldest";
  type: "bug" | "feature_request";
  status: "open" | "in_progress" | "resolved";
};
