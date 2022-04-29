const router = require("express").Router();
const {getUsers, getSingleUser, createUser, updateUser} = require("../../controllers/userController");
const { get, post } = require("../../models/reaction");

router.route('/')
    .get(getUsers)
    .post(createUser)
    .put(updateUser);

router.route('/:userId').get(getSingleUser)
    // .put(updateUser)
    .get(getSingleUser);

module.exports = router;

