import express from "express";
import dotenv from "dotenv";
import blizzardRouter from "./routes/blizzard";
import warcraftPetsRouter from "./routes/warcraftpets";
import promptsRouter from "./routes/prompts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/blizzard", blizzardRouter);
app.use("/api/warcraftpets", warcraftPetsRouter);
app.use("/api/prompts", promptsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
