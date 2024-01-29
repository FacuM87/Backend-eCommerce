import { Router } from "express";
//import db from "../../db.json" assert { type: "json" };
import { checkRegisteredUser, auth, checkAdminPermissions, checkUserPermissions } from "../middlewares/middlewares.js"
import { cartView, productsView, checkOutView, realTimeProducts, index, chat, register, login, profile } from "../controllers/views.controller.js";

const router = Router ()

/* -- Session Views -- */
router.get("/", checkRegisteredUser, login)
router.get("/register", checkRegisteredUser, register)
router.get("/profile", auth, profile)

/* -- Admin CRUD -- */
router.get("/realtimeproducts", checkAdminPermissions, realTimeProducts)

/* -- Chat --  */
router.get("/chat", checkUserPermissions, chat)

/* -- Cart -- */
router.get("/cart/:cid", cartView)

/* -- Products -- */
router.get("/products", productsView)
router.get("/index", index)

/* -- CheckOut -- */
router.get("/checkout", checkOutView)

export default router
