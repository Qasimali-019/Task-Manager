const express = require("express")
const { signup, login, getMe, getAllUsers } = require("./controllers/authController")
const router = express.Router()
const authMiddleware = require("./middleware/authMiddleware");

router.post("/signup", signup)
router.post("/login", login)
//admin and users can view their own profile
router.get("/me", authMiddleware(["admin", "user"]), getMe)

router.get("/users", authMiddleware(["admin"]), getAllUsers)

module.exports = router