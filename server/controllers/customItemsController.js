import { pool } from "../config/database.js";

// GET all items
export const getAllItems = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM custom_items ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE item
export const createItem = async (req, res) => {
  const { name, features, total_price } = req.body;

  // simple validation example
  if (features.color === "green" && features.material === "leather") {
    return res.status(400).json({ error: "Green leather is not available." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO custom_items (name, features, total_price) VALUES ($1, $2, $3) RETURNING *",
      [name, features, total_price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE item
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, features, total_price } = req.body;
  try {
    const result = await pool.query(
      "UPDATE custom_items SET name=$1, features=$2, total_price=$3 WHERE id=$4 RETURNING *",
      [name, features, total_price, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE item
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM custom_items WHERE id=$1", [id]);
    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
