const { createError } = require("../error")
const User = require('../modals/user')
const Video = require("../modals/video")


const update = async (req, res, next) => {

    if (req.params.id === req.user.id) {

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                //return new update data
                { new: true })
            res.status(200).json(updatedUser)
        }
        catch (err) {
            next(err)
            res.send(err)
        }

    } else {
        return next(createError(403, "You can update only your account"))
    }

}




const deleteUser = async (req, res, next) => {

    if (req.params.id === req.user.id) {

        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        }
        catch (err) {
            next(err)
            //  res.send(err)
        }

    } else {
        return next(createError(403, "You can deleted only your account"))
    }
}






const getUser = async (req, res, next) => {

    try {

        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch (err) {
        next(err)
        // console.log("error for gr", err)
    }

}


const subscribe = async (req, res, next) => {

    try {

        //this is user id === req.user.id
        await User.findByIdAndUpdate(req.user.id, {
            //subscribeUsers: req.params. == this is other chanel id
            //subccribe user ko [ ] array me store kiya gay hai so push methods
            $push: { subscribedUsers: req.params.id }
        })
        //subscribers  ///subscribedUsers
        //subscrin=ber increment
        //$inc methods
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json("Subscription successfull.")
    }
    catch (err) {
        next(err)
    }

}




const unsubscribe = async (req, res, next) => {

    try {

        //this is user id === req.user.id
        await User.findByIdAndUpdate(req.user.id, {
            //subscribeUsers: req.params. == this is other chanel id
            //subccribe user ko [ ] array me store kiya gay hai so pull methods
            $pull: { subscribedUsers: req.params.id }
        })

        //subscrin=ber increment
        //$inc methods
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        res.status(200).json("Unsubscription successfull.")
    }
    catch (err) {
        next(err)
    }

}


const like = async (req, res, next) => {
    //like modal array type ha

    const id = req.user.id;
    const videoId = req.params.videoId;
    try {

        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })

        //$addToSet== make sure that your id in array only ones
        //one likes but not repeat again and again

        res.status(200).json("Video has been liked")

    }
    catch (err) {
        next(err)
    }

}



const dislike = async (req, res, next) => {

    const id = req.user.id;
    const videoId = req.params.videoId;
    try {

        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })

        //$addToSet== make sure that your id in array only ones
        //one likes but not repeat again and again

        res.status(200).json("Video has been disliked")

    }
    catch (err) {
        next(err)
    }

}

module.exports = {
    update, deleteUser, getUser, subscribe, unsubscribe, like, dislike
}