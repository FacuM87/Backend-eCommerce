import { Router } from "express"
import { changeUserRole, deleteInactives, deleteUser, getUserByEmail, getUsers } from "../controllers/users.controllers.js"

const router = Router()

router.get("/", getUsers)
router.delete("/", deleteInactives)
router.delete("/deleteUser/:userId", deleteUser)
router.get("/user", getUserByEmail)
router.put("/user", changeUserRole)


export default router