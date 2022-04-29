const router = require("express").Router();
const {getUsers, getSingleUser, createUser} = require("../../controllers/userController");
const { get, post } = require("../../models/reaction");

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId').get(getSingleUser);

module.exports = router;

