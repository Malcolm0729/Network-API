const { User, Thought } = require('../models');


module.exports = {
    addReaction(req, res) {
        // Thought.create(req.body)
        // console.log(req.body)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json({message: `Added reaction to thought`})
        )
      .catch((err) => res.status(500).json(err));
  },
    removeReaction(req, res) {
        console.log('You are removing a reaction');
        // find thought by its id, 
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: {reactionId: req.body.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
};