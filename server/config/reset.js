import dotenv from "dotenv";
import { pool } from "./database.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

console.log("📡 Connecting to database...");
console.log(`Host: ${process.env.PGHOST}`);
console.log(`Database: ${process.env.PGDATABASE}`);
console.log(`User: ${process.env.PGUSER}`);

const createTable = async () => {
  try {
    console.log("🔨 Creating table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS custom_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        features JSONB,
        total_price DECIMAL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ custom_items table created successfully");
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating table:", error.message);
    await pool.end();
    process.exit(1);
  }
};

createTable();
