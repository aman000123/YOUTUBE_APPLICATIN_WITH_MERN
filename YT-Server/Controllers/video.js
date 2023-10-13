
const { createError } = require('../error');
const User = require('../modals/user');
const Video = require('../modals/video')

const addVideo = async (req, res, next) => {

    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        //video save
        const saveVideo = await newVideo.save();
        res.status(200).json(saveVideo)

    }
    catch (err) {
        next(err)
    }


}

const fetchAllVideo = async (req, res, next) => {
    try {
        const videos = await Video.find();
        // Retrieve all video documents from the database
        // Map the video documents to extract the necessary data (e.g., _id, imgUrl, userId) for each video
        const videoData = videos.map((video) => ({
            _id: video._id,
            imgUrl: video.imgUrl,
            userId: video.userId,
            // Add other fields as needed
        }));

        // console.log("video data===>", videoData);

        res.status(200).json(videoData);
    } catch (error) {
        next(error);
    }
}

const updateVideo = async (req, res, next) => {

    //find user id and verufy

    try {

        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found"));

        if (req.user.id === video.userId) {

            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body//jo bhi updated ho set ho jaye
            }, {
                new: true
            });

            res.status(200).json(updatedVideo)
        } else {
            return next(createError(404, "You can update only your videos"));

        }

    }
    catch (err) {
        next(err)
    }


}

const deleteVideo = async (req, res, next) => {


    try {

        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found"));

        if (req.user.id === video.userId) {

            await Video.findByIdAndDelete(req.params.id);

            res.status(200).json("The video has been deleted")
        } else {
            return next(createError(404, "You can delete only your videos"));

        }

    }
    catch (err) {
        next(err)
    }

}

const getVideo = async (req, res, next) => {

    try {

        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
        // console.log("video get", video)

    }
    catch (err) {
        next(err)
        console.log("erro in get video", err)
    }


}


const addView = async (req, res, next) => {
    try {

        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};



const random = async (req, res, next) => {

    try {
        //aggrgate function for random
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos)

    }
    catch (err) {
        next(err)
    }


}

const trend = async (req, res, next) => {

    try {

        const videos = await Video.find().sort({ views: -1 }); //{views:-1}==>most views video
        //{views:1}== less views video
        res.status(200).json(videos)

    }
    catch (err) {
        next(err)
    }


}










const subscribedVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};




const getByTag = async (req, res, next) => {

    // const tags = req.query.tags;
    //console.log("tags", tags)
    //to separate tags
    //http://localhost:4004/api/videos/tags?tags=js
    const tags = req.query.tags.split(",");
    console.log("tags", tags)

    try {
        //$in check inside or not
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        //{views:-1}==>most views video
        //{views:1}== less views video
        //limit(20)  get only 20 video by tags search
        res.status(200).json(videos)

    }
    catch (err) {
        next(err)
    }


}

const search = async (req, res, next) => {

    const query = req.query.q
    //http://localhost:4004/api/videos/search?q=le
    //q==le
    try {
        //uper case ,lower case all should same in search
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40); //{views:-1}==>most views video
        //{views:1}== less views video
        res.status(200).json(videos)

    }
    catch (err) {
        next(err)
    }


}


module.exports = {
    addVideo, updateVideo, deleteVideo, getVideo, random, addView, subscribedVideo, trend, getByTag, search, fetchAllVideo
}