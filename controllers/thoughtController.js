const { User, Thought } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v') // - means ignore to Mongo ("-" means do not select this)
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that ID' })
                }
                res.status(200).json(thoughtData)
            })
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        console.log("createThought REQ BODYYY", req.body)
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
            })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'Thought created but no user with that ID' })
                }
                res.json({ message: "Thought successfully created " })
            })
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { runValidators: true, new: true })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findByIdAndDelete(
            req.params.thoughtId,
            req.body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));

    },

    addReaction(req, res) {
        console.log("createThought REQ BODYYY", req.body)
        console.log("find thought by id", req.params.thoughtId)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((dbThoughtData) => {
                !dbThoughtData ?
                    res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(dbThoughtData)
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true }
        )
            .populate({ path: 'reactions', select: '-__v' })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id.' })
                    : Thought.deleteMany({ _id: { $in: thought.reactions } })
            )
            .then(() => res.json({ message: 'Reaction deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
};