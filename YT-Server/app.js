const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const cors = require("cors")
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


// Connect to MongoDB using Mongoose

//const mongoURL = process.env.MONGO_URL

// Connect to MongoDB using Mongoose
mongodb+srv://aman:<password>@cluster0.rr10twt.mongodb.net/?retryWrites=true&w=majority







mongoose.connect(`mongodb+srv://aman:aman@123@cluster0.rr10twt.mongodb.net/Youtube?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB is connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});


const port = process.env.PORT || '4005'
app.listen(port, () => {
    // connect(),
    console.log("Connected at port 4005 port")
})



// Enable CORS for all routes (globally)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


const corsOptions = {
    origin: 'https://65297318104ccc19af71b8c8--eclectic-crumble-be736a.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and authentication headers
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use error all over in catch blocks
app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || "Something got wrong !";

    return res.status(status).json({
        success: false,
        status,
        message
    })
})


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const videoRouter = require('./routes/video');
const commentRouter = require('./routes/comments');
const authRouter = require('./routes/authentication');


app.use('/', indexRouter);
app.use('/api/auths', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/videos', videoRouter);
app.use('/api/comments', commentRouter);


module.exports = app;
