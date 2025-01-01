const { Router } = require("express")
const router = Router()

const { register , login , account} = require("../controllers/user.controller")
const { registerValidation, loginValidation} = require("../validation/auth")
const { handleValidationErrors } = require("../validation/errors")
const protectAuth = require("../middlewares/protectAuth")

router.post("/register", registerValidation, handleValidationErrors, register)
router.post("/login", loginValidation, handleValidationErrors, login)
router.get("/account", protectAuth, account)

module.exports = router