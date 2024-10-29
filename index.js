require("dotenv").config();
const express = require("express");
const db = require("./db/config");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Express server!" });
});

// Test database connection
app.get("/db-test", async (req, res) => {
    try {
        await db.raw("SELECT 1");
        res.json({ message: "Database connection successful!" });
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
