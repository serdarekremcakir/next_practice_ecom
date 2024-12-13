const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const sqlFilePath = path.join(__dirname, "seed.sql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

(async () => {
  try {
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
