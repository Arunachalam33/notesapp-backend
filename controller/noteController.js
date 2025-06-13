import pool from "../db/db.js";




// CREATE a note
export async function createNote(req, res) {
  const userId = req.user.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO notes(user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Create Note Error", err);
    res.status(500).json({ message: "Error creating note" });
  }
}

// GET all notes
export async function getNotes(req, res) {
  const userId = req.user.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch Note Error", err);
    res.status(500).json({ message: "Error fetching notes" });
  }
}

// UPDATE a note
export const updateNote = async (req, res) => {
  const userId = req.user.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, content, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Update Note Error", err);
    res.status(500).json({ message: "Error updating note" });
  }
};

// DELETE a note
export const deleteNote = async (req, res) => {
  const userId =req.user.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Delete Note Error", err);
    res.status(500).json({ message: "Error deleting note" });
  }
};
