const router = require('express').Router();

const {
    addReaction,
    removeReaction,
} = require('../../controllers/reactionController');

router.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction)

module.exports = router;