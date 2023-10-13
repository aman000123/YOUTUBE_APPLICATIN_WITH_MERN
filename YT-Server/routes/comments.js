const express = require('express');
const router = express.Router();

const { addComment, deleteComment, getAllComment } = require('../Controllers/comment');
const { verifyToken } = require('../verifyToken');

/* GET users listing. */


router.post("/", verifyToken, addComment)

router.delete("/:id", verifyToken, deleteComment)


router.get('/:videoId', getAllComment);

module.exports = router;
