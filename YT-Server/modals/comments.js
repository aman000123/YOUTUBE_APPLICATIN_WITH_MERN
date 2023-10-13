
//create user scheem for show colllection db
const mongoose = require('mongoose');


const commentsScheema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,

    },
    videoId: {
        type: String,
        required: true,

    },
    desc: {
        type: String,
        required: true,

    },



},
    { timestamps: true }
);


module.exports = mongoose.model("Comment", commentsScheema)

