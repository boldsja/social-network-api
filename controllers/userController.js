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
        .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(post)
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res){
        User.findByIdAndUpdate(
            { _id: req.params.userId}, 
			{$set: req.body }, 
            { runValidators: true, new: true })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    }
};
