import { Router } from "express";
//import db from "../../db.json" assert { type: "json" };
import { checkRegisteredUser, auth, checkAdminPermissions, checkUserPermissions, checkAdminPremiumPermissions } from "../middlewares/middlewares.js"
import { cartView, productsView, realTimeProducts, index, chat, register, login, profile, restablishPassword, resetPasswordForm, usersCrud } from "../controllers/views.controller.js";
import passport from "passport";

const router = Router ()

/* -- Session Views -- */
router.get("/", checkRegisteredUser, login)
router.get("/register", register)
router.get("/profile", /* auth ,*/ passport.authenticate("jwt", { session: false }), profile)

/* -- CRUD -- */
router.get("/realtimeproducts", passport.authenticate("jwt", { session: false }), checkAdminPremiumPermissions, realTimeProducts)

/* -- Chat --  */
router.get("/chat", passport.authenticate("jwt", { session: false }), checkUserPermissions, chat)

/* -- Cart -- */
router.get("/cart/:cid", passport.authenticate("jwt", { session: false }), cartView)

/* -- Products -- */
router.get("/products", passport.authenticate("jwt", { session: false }), productsView)
router.get("/index", index)

/* Restablish Password */
router.get("/restablishPassword", restablishPassword)
router.get("/resetPassword/:token", resetPasswordForm)

/* Users CRUD view */
router.get("/usersrolecrud", passport.authenticate("jwt", { session: false }), usersCrud)


export default router
