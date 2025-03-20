import express from "express";
import { getMessages, sendMessage } from "../contrllers/messageController.js";

const router = express.Router();

router.post("/messages", sendMessage);
router.get("/messages/:room", getMessages);

export default router;