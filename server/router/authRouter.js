const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authController");
const { signupSchema, loginSchema } = require("../validator/authValidator");
const validate = require("../middlewares/validateMiddlewares");
const authMiddleware = require("../middlewares/authMiddlewares");

// router.get("/", (req, res) => {
//     res.status(200).send("Welcome to my website using router");
// });

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;
