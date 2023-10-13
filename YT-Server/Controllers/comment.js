
const { createError } = require('../error');
const Comment = require('../modals/comments');
const User = require('../modals/user');
const Video = require('../modals/video');



const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id })

    try {

        const savedComment = await newComment.save();
        res.status(200).send(savedComment)
        console.log("savedComment is", savedComment)


    }
    catch (err) {
        next(err)
        //console.log("error in add comment ", err)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        // console.log("commentid ===", req.params.id);
        // const userId = req.query.userId;
        // console.log("userid ===", userId);
        // const videoId = req.query.videoId;
        // console.log("videoId ===", videoId);
        // console.log("req.user.id==", req.user.id)


        const comment = await Comment.findById(req.params.id); // Find comment details

        const video = await Video.findById(req.query.videoId); // Find video all details

        // console.log("comment.userId", comment)
        // console.log("video.userId===", video)


        // Check if the user is authorized to delete the comment
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json(`The comment has been deleted.`);
        } else {
            res.status(403).json({
                message: ` you can delete only your comment`,
            });
        }
    } catch (err) {
        next(err);
    }
};

const getAllComment = async (req, res, next) => {

    try {
        //find all comment from one video
        const comments = await Comment.find({ videoId: req.params.videoId }).limit(40);
        res.status(200).json(comments);

    }
    catch (err) {
        next(err)
    }
}


module.exports = {
    addComment, deleteComment, getAllComment
}