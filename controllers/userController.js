const { User, Thought } = require("../models");

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v') // - means ignore to Mongo ("-" means do not select this)
            .populate('thoughts')
            .populate('friends')
            .then((users) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(users)
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { runValidators: true, new: true })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findByIdAndDelete(
            { _id: req.params.userId },
            { new: true })
            .then((dbUserData) =>
                !dbUserData ? res.status(400).json({ message: "No user found" }) : Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
            )
            .then(() => res.json({ message: "user and thoughts deleted" }))
            .catch((err) => res.status(500).json(err));

    },

    addFriend(req, res) {
        console.log("Add a buddy", req.body)
        console.log("find said buddy by id", req.body.userId)
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { friends: req.body } },
            { new: true }
        )
            .then((dbUserData) => {
                !dbUserData ?
                    res.status(404).json({ message: 'No user with that ID' })
                    : res.json(dbUserData)
            })
            .catch((err) => res.status(500).json(err));
    },
}