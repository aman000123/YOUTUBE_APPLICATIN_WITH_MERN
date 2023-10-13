const express = require('express');
const router = express.Router();

const { addVideo, updateVideo, deleteVideo, getVideo, random, addView, subscribedVideo, trend, getByTag, search, fetchAllVideo } = require('../Controllers/video')

const { verifyToken } = require('../verifyToken')


// Route to fetch all video data
router.get('/all', fetchAllVideo)
//here we use video id not user id
router.post('/', verifyToken, addVideo);

router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);

//video get ke liye we dont need find token verify
router.get('/find/:id', getVideo);

//views increment
router.put('/view/:id', addView);

router.get('/trend', trend);

router.get('/random', random);

router.get('/sub', verifyToken, subscribedVideo);

//get video by tag
router.get('/tags', getByTag);


//get video by title serch
router.get('/search', search);

module.exports = router;
