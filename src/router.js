const express = require("express")
const addressesController = require("./controllers/addresses-controller")
const authController = require("./controllers/auth-controller")
const favoritesController = require("./controllers/favorites-controller")
const productsController = require("./controllers/products-controller")
const profilesController = require("./controllers/profiles-controller")
const ratingsController = require("./controllers/ratings-controller")
const usersController = require("./controllers/users-controller")
const withAuth = require("./middlewares/auth")
const { productUpload } = require("./middlewares/upload")
const categoriesController = require("./controllers/categories-controller")
const conversationsController = require("./controllers/conversations-controller")

const router = express.Router()

router.post("/login", authController.login)
router.post("/register", authController.register)

router.get("/categories", categoriesController.index)

router.get("/products", productsController.index)
router.get("/products/search", productsController.search)
router.post("/products", withAuth, productUpload.array("images", 6), productsController.save)
router.put("/products/:_id", withAuth, productsController.update)
router.put("/products/:_id/images", withAuth, productUpload.array("newImages", 6), productsController.updateImages)
router.delete("/products/:_id", withAuth, productsController.delete)

router.put("/profile", withAuth, profilesController.update)
router.put("/profile/password", withAuth, profilesController.updatePassword)
router.get("/users/:_id", withAuth, usersController.show)

router.get("/addresses", withAuth, addressesController.index)
router.post("/addresses", withAuth, addressesController.save)
router.delete("/addresses/:_id", withAuth, addressesController.delete)

router.get("/favorites", withAuth, favoritesController.index)
router.post("/favorites", withAuth, favoritesController.add)
router.delete("/favorites/:product_id", withAuth, favoritesController.remove)

router.post("/ratings", withAuth, ratingsController.rate)

router.get("/conversations", withAuth, conversationsController.index)
router.post("/conversations", withAuth, conversationsController.save)
router.post("/conversations/:_id/send", withAuth, conversationsController.send)

module.exports = router