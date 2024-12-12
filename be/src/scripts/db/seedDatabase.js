import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

(async () => {
  try {
    const sqlFilePath = path.join(__dirname, "seed.sql");
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

    const queries = sqlContent.split(";").filter((query) => query.trim());
    for (const query of queries) {
      await pool.query(query); 
      console.log("Query running:", query.slice(0, 50), "...");
    }

    console.log("Database has been seeded successfully!");
    await pool.end();
  } catch (error) {
    console.error("An error occurred:", error.message);
    console.error("An error occurred:", error);
  }
})();
