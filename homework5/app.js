const express = require('express');
const mongoose = require('mongoose');

const {PORT, MONGODB} = require('./config/veriables');

const app = express();

mongoose.connect(MONGODB);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const {userRouter} = require('./routes');

app.get('/ping', (req, res) => res.json('Pong'));

app.use('/users', userRouter);
// app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not found'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}

// function connectDB(){
//     mongoose.connect(`${MONGODB}`);
//     const {connect} = mongoose;
//     connect('err', (err)=>{
//         console.log(err);
//     });
// }
