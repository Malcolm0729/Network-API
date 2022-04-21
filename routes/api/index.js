const router = require('express').Router();
const friendRoutes = require('./friendRoutes');
const userRoutes = require('./userRoutes');
const reactionRoutes = require('./reactionRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//uses the api routes with these url queries
router.use('/users, userRoutes');
router.use('/users, friendRoutes');
router.use('/thoughts, thoughtRoutes');
router.use('/thoughts, reactionRoutes');

module.exports = router;