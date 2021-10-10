require('./config/config');
require('./models/db');
require('./config/passportConfig');
const express = require('express');

// var rout = express.Router();
// var mongo = require('mongodb');
var assert = require('assert');
// var  url = 'mongodb://localhost:27017/BookMyShow';


const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');
const { AssertionError } = require('assert');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api', rtsIndex);

app.use((err, req, res, next)=>{
    if (err.name==='ValidationError'){
    var valErrors = [];
    Object.keys(err.errors).forEach(key=> valErrors.push(err.errors[key].message));
    res.status(422).send(valErrors)
}
});


// rout.get('/get-bus', function(req,res,next){
//     var resultArray = [];
//     mongo.connect(url, function(err, db){
//         assert.equal(null,err);
//         var cursor = db.collection('buses').find();
//         cursor.forEach(function(doc, err){
//             assert.equal(null, err);
//             resultArray.push(doc);
//         }, function(){
//             res.render('',{bus: resultArray});
//         });

//     });
// });

// rout.post('/post-bus', function(req, res, next){
//     var bus = {
//         title: req.body.title,
//         source: req.body.source,
//         dest: req.body.dest,
//         time: req.body.time,
//         date: req.body.date
//     };
//     mongo.connect(url, function(){
//         assert.equal(null,err);
//         db.collection('buses').insertOne(bus, function(err, result){
//             assert.equal(null,err);
//             console.log("buses inserted");
//         });
//     })
// });

// module.exports = rout;


app.listen(process.env.PORT, ()=> console.log(`server started at port : ${process.env.PORT}`));

