import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const config = {
  connection_string: process.env.CONNECTION_STRING,
  port: process.env.PORT,
  secret: process.env.SECRET_KEY,
  token_expires_in: process.env.TOKEN_EXPIRES_IN,
};

export default config;
