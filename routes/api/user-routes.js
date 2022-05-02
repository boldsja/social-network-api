const router = require("express").Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend } = require("../../controllers/userController");
const { db } = require("../../models/user");

//get all users, create a new one
router.route('/')
    .get(getUsers)
    .post(createUser)

//updates, gets, and deletes users by id
router.route('/:userId')
    .put(updateUser)
    .get(getSingleUser)
    .delete(deleteUser)
    .put(addFriend);

router.route('/:userId/friends/:friendId').post(addFriend);

module.exports = router;