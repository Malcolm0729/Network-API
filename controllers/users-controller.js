const {Users} = require('../models');

const userController = {
    createUsers({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    getAllUsers(req, res) 
}