const router = require("express").Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require("../../controllers/userController");
const { db } = require("../../models/user");

//get all users, create a new one
router.route('/')
    .get(getUsers)
    .post(createUser)

//updates, gets, and deletes users by id
router.route('/:userId')
    .put(updateUser)
    .get(getSingleUser)
    .delete(deleteUser);

module.exports = router;