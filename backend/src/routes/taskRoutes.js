const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("./controllers/taskController");
const authMiddleware = require("./middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware(["admin", "user"]), createTask);
router.get("/", authMiddleware(["admin", "user"]), getTasks);
router.put("/:id", authMiddleware(["admin", "user"]), updateTask);
router.delete("/:id", authMiddleware(["admin", "user"]), deleteTask);

module.exports = router;