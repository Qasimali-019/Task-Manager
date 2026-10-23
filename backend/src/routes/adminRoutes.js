const express = require("express");
const router = express.Router();

const authMiddleware = require("./middleware/authMiddleware");
const {
    getAdminStats,
    getAdminUsers,
    getAdminTasks,
    getRecentActivity
} = require("./controllers/adminController");

router.use(authMiddleware(["admin"]));

router.get("/stats", getAdminStats);
router.get("/users", getAdminUsers);
router.get("/tasks", getAdminTasks);
router.get("/activity", getRecentActivity);

module.exports = router;