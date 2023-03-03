import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ...(process.env.MODE === 'prod' && {
    ssl: {
      rejectUnauthorized: true,
    },
  }),
};

const db = new Pool(configDatabase);

export default db;