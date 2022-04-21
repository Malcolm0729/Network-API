const { User, Thought } = require('../models');

module.exports = {
    addFriend(req, res) {
        console.log('You are adding a friend');
        User.findOneAndUpdate(
            {_id: req.params.userId },
            { $addToSet: { freinds: req.params.friendId} },
            {runValidators: true, new: true }
        )
        .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        console.log('You are removing a friend');
        // find the user to delete by their id, from the users friends property, pull the friendId from the query parameter
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
};