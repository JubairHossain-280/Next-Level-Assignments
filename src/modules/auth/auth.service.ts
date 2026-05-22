import config from "../../config/index.js";
import { pool } from "../../db/index.js";
import { ILogin, IRegister } from "./auth.interface.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUserIntoDB = async (payload: IRegister) => {
  const { name, email, password, role } = payload;

  const user = await pool.query(
    `
        SELECT 1 FROM users
        WHERE email = $1;
    `,
    [email],
  );

  if (user.rows.length !== 0) {
    throw new Error("User already exists with this email!");
  }

  if (role && role !== "contributor" && role !== "maintainer") {
    throw new Error("Role must be contributor or maintainer!");
  }

  if (typeof password !== "string") {
    throw new Error("Password must be a string!");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `
        INSERT INTO users 
        (name, email, password, role) 
        VALUES ($1,$2,$3,COALESCE($4,'contributor'))
        RETURNING id, name, email, role, created_at, updated_at;
    `,
    [name, email, hashedPassword, role],
  );

  return result;
};

const loginUserIntoDB = async (payload: ILogin) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
        SELECT * FROM users
        WHERE email = $1;
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid credentials!");
  }

  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid credentials!");
  }

  const tokenPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(
    tokenPayload,
    config.secret as jwt.Secret,
    {
      expiresIn: config.token_expires_in,
    } as jwt.SignOptions,
  );

  delete user.password;

  return { token, user };
};

export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
};
