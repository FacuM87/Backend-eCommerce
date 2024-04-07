import { Router } from 'express';
import { createSession } from "../controllers/payments.controller.js";

const router = Router();

router.post("/createorder/:totalAmount", createSession )

export default router
