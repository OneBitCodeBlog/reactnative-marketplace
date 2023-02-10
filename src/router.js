const express = require("express")
const addressesController = require("./controllers/addresses-controller")
const authController = require("./controllers/auth-controller")
const favoritesController = require("./controllers/favorites-controller")
const productsController = require("./controllers/products-controller")
const ratingsController = require("./controllers/ratings-controller")
const usersController = require("./controllers/users-controller")
const withAuth = require("./middlewares/auth")
const { productUpload } = require("./middlewares/upload")

const router = express.Router()

router.post("/login", authController.login)
router.post("/register", authController.register)

router.get("/products", productsController.index)
router.post("/products", withAuth, productUpload.array("images", 6), productsController.save)

router.get("/users/:_id", withAuth, usersController.show)

router.get("/addresses", withAuth, addressesController.index)
router.post("/addresses", withAuth, addressesController.save)
router.delete("/addresses/:_id", withAuth, addressesController.delete)

router.post("/favorites", favoritesController.add)
router.delete("/favorites/:product_id", favoritesController.remove)

router.post("/ratings", withAuth, ratingsController.rate)

module.exports = router