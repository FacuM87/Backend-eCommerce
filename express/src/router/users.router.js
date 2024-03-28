import { Router } from "express"
import { deleteInactives, getUserByEmail, getUsers } from "../controllers/users.controllers.js"

const router = Router()

router.get("/", getUsers)
router.delete("/", deleteInactives)
router.get("/user", getUserByEmail)



export default router