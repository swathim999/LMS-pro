const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON payloads

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",       // Replace with your MySQL username
    password: "1234",   // Replace with your MySQL password
    database: "elearning"
});

db.connect((err) => {
    if (err) {
        console.error("Unable to connect to the database:", err);
    } else {
        console.log("Connected to the MySQL database.");
    }
});

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the eLearning API!");
});

// Signup Endpoint
app.post("/auth/register", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const query = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
        db.query(query, [fullName, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ message: "Email already exists." });
                }
                return res.status(500).json({ message: "Database error.", error: err });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
