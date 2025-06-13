import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controller/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
// Create a note
router.post("/", createNote);

// Get all notes for the logged-in user
router.get("/", getNotes);

// Update a note
router.put("/:id", updateNote);

// Delete a note
router.delete("/:id", deleteNote);

export default router;
