import { Router } from "express";
//import db from "../../db.json" assert { type: "json" };
import { checkRegisteredUser, auth, checkAdminPermissions, checkUserPermissions } from "../middlewares/middlewares.js"
import { cartView, productsView, checkOutView, realTimeProducts, index, chat, register, login, profile } from "../controllers/views.controller.js";
import passport from "passport";

const router = Router ()

/* -- Session Views -- */
router.get("/", checkRegisteredUser, login)
router.get("/register", passport.authenticate("jwt", { session: false }), checkRegisteredUser, register)
router.get("/profile", /* auth ,*/ passport.authenticate("jwt", { session: false }), profile)

/* -- Admin CRUD -- */
router.get("/realtimeproducts", passport.authenticate("jwt", { session: false }), checkAdminPermissions, realTimeProducts)

/* -- Chat --  */
router.get("/chat", passport.authenticate("jwt", { session: false }), checkUserPermissions, chat)

/* -- Cart -- */
router.get("/cart/:cid", passport.authenticate("jwt", { session: false }), cartView)

/* -- Products -- */
router.get("/products", passport.authenticate("jwt", { session: false }), productsView)
router.get("/index", index)

/* -- CheckOut -- */
router.get("/checkout", passport.authenticate("jwt", { session: false }),checkOutView)

export default router
