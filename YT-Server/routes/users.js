const express = require('express');
const router = express.Router();

const { update, deleteUser, getUser, subscribe, unsubscribe, like, dislike } = require('../Controllers/user')


const { verifyToken } = require('../verifyToken')
/* GET users listing. */

//update user

//verifyToken  as a middleware
router.put('/:id', verifyToken, update);

//delete user

router.delete('/:id', verifyToken, deleteUser);

//get user

router.get('/find/:id', getUser);

//subscribe user
router.put('/sub/:id', verifyToken, subscribe);

//unsubscribe user
router.put('/unsub/:id', verifyToken, unsubscribe);

//like video
router.put('/like/:videoId', verifyToken, like);
//dislike video
router.put('/dislike/:videoId', verifyToken, dislike);

module.exports = router;
