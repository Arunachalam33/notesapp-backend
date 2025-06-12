import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoute from "./routes/auth.js";
import noteRoute from "./routes/note.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT||4000;

app.use(cors());
app.use(express.json());

app.use("/api",authRoute);
app.use("/api/notes",noteRoute);

app.get("/", (req, res) => {
  res.send("Backend server is working!");
});

console.log("Before app.listen");

app.listen(PORT, () => {
  console.log(`✅ Server Running on Port ${PORT}`);
});

console.log("After app.listen");
