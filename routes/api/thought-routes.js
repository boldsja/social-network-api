const router = require("express").Router();
const {getThoughts, getSingleThought, createThought, addReaction, deleteThought, updateThought, deleteReaction} = require("../../controllers/thoughtController");

router.route('/')
    .get(getThoughts)
    .post(createThought)

//routes that require id
router.route('/:thoughtId')
    .put(updateThought)
    .get(getSingleThought)
    .delete(deleteThought);

router.route("/:thoughtId/reactions")
        .post(addReaction)

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;