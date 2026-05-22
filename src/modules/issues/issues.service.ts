import { pool } from "../../db/index.js";
import { IIssues } from "./issues.interface.js";

const createIssuesIntoDB = async (payload: IIssues, reporterId: number) => {
  const { title, description, type } = payload;

  if (type && type !== "bug" && type !== "feature_request") {
    throw new Error("Issues type must be bug or feature_request");
  }

  const result = await pool.query(
    `
            INSERT INTO issues
            (title, description, type, reporter_id)
            VALUES ($1,$2,$3,$4)
            RETURNING *
        `,
    [title, description, type, reporterId],
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async (
  sort: string,
  type: string | undefined,
  status: string | undefined,
) => {
  const conditions = [];
  const values = [];
  let parameterize = 1;

  if (type) {
    conditions.push(`type = $${parameterize++}`);
    values.push(type);
  }

  if (status) {
    conditions.push(`status = $${parameterize++}`);
    values.push(status);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const orderBy = sort === "oldest" ? "ASC" : "DESC";

  const issuesResult = await pool.query(
    `
      SELECT * FROM issues
      ${whereClause}
      ORDER BY created_at ${orderBy}
    `,
    values,
  );

  const issues = issuesResult.rows;

  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

  const reportersResult = await pool.query(
    `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
    `,
    [reporterIds],
  );

  const reportersDetails = reportersResult.rows;

  const reporterLookUp = reportersDetails.reduce((table, reporter) => {
    table[reporter.id] = reporter;
    return table;
  }, {});

  return issues.map(({ reporter_id, created_at, updated_at, ...issue }) => ({
    ...issue,
    reporter: reporterLookUp[reporter_id],
    created_at,
    updated_at,
  }));
};

export const issuesService = {
  createIssuesIntoDB,
  getAllIssuesFromDB,
};
