import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controller/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a note
router.post("/",authMiddleware, createNote);

// Get all notes for the logged-in user
router.get("/",authMiddleware, getNotes);

// Update a note
router.put("/:id",authMiddleware, updateNote);

// Delete a note
router.delete("/:id",authMiddleware, deleteNote);

export default router;
