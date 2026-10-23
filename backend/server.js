const express = require("express")
const pool = require("./db")
const authRoutes = require("./src/routes/authRoutes");
const app = express()
const cors = require("cors");
const taskRoutes = require("./src/routes/taskRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const PORT = 5000

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"]
}));

app.get("/", (req, res) => {

    res.send("Task manager backend is running")
})

app.get("/test-db", async (req, res) => {
    const result = await pool.query(`
        SELECT
            current_database(),
            current_user,
            inet_server_port()
    `)
    res.json(result.rows)
})

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})