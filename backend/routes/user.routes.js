
import express from "express";
import userController from "../controller/user.controller.js";
import authMiddleware from "../middleware/middleware.js";

const router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/private", authMiddleware, async (req, res) => {
    return res.send("<h1>alguma coisa</h1>")
})

















export default router;