const router = require("express").Router();
const UserController = require("../controllers/userController");
const authController = require("../controllers/authController");
const verifyJWT = require("../middlewares/verifyJwt")

router.get("/getAllUsers", verifyJWT, UserController.getAllUsers);
router.post('/signUp', UserController.signUp);
router.delete('/removeUser', UserController.removeUser);
router.put('/updateUser', UserController.updateUser);
router.post('/logIn', authController.handleLogin);
module.exports = router;