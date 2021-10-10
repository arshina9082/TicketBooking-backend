const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const Bus = mongoose.model('Bus');
const _ = require('lodash');

module.exports.register=(req, res, next)=>{
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc)=>{
        if (!err){
            res.send(doc);
            console.log(doc);
        }
        else{
            if(err.code==11000)
                res.status(422).send(['Duplicate email address']);
            else
                return next(err);
        }

    });
}

module.exports.postbus=(req, res, next)=>{

    var bus = new Bus();
    bus.title = req.body.title;
    bus.source = req.body.source;
    bus.dest = req.body.dest;
    bus.date = req.body.date;
    bus.time = req.body.time
    bus.save((err, doc)=>{
        if (!err){
            res.send(doc);
            console.log(doc);
        }
        else{
            if(err.code==11000)
                res.status(422).send(['error']);
            else
                return next(err);
        }

    });
}

module.exports.getbus = (req, res, next) => {
Bus.find({_source: req._source, _dest: req._dest, _date: req._date, _time: req._time}, function(err, doc){
    if (err)
    res.status(404).json({ status: false, message:'user record not found'});
    else
        res.status(200).json({status: true, bus:doc[20]});
});
    // (err, bus)=>{
    // if(err)
    //     return err;
    // else
    //     return res.status(200).json({ status: true, bus: _.pick(bus, ['source','dest','title','time']) });


}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info)=>{ 
        if (err)
            return res.status(400).json(err);
        else if(user){
            return res.status(200).json({"token": user.generateJwt() });
        }
        else
            return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next)=>{
    User.findOne({_id: req._id},
        (err, user)=>{
            if (!user)
                return res.status(404).json({ status: false, message:'user record not found'});
            else
                return res.status(200).json({ status: true, user: _.pick(user,['fullName','email']) });
        }
        );
}

