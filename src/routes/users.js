const express = require("express");
const {
  registerUser,
  loginUser,
  searchUserById,
  getUsers,
  toggleUserActiveStatus,
  updateUser,
  deleteUser,
  restoreUser,
  logginGoogle
} = require("../controllers/users");
const router = express.Router();

/* GET users listing. */
router.get("/", getUsers);
router.get("/:id", searchUserById);
router.put("/update", updateUser);
router.put("/:id", toggleUserActiveStatus);
router.put("/restore/:id", restoreUser);
router.post("/", registerUser);
router.post("/googleloggin", logginGoogle);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

module.exports = router;
