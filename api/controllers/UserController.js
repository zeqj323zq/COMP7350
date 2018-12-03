/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create : async function(req, res) {

        sails.bcrypt = require('bcryptjs');

        var user = req.body;

        if (user === "undefined")
          return res.badRequest(+"Form-data not received.");

        const saltRounds = 10;
        const hash = await sails.bcrypt.hash(user.password, saltRounds);    

        user.password = hash;
        await User.create(user);
        res.send({result: 'success', user: req.body});
    
    },

    show : async function(req, res) {
        //
        var objs = await User.find();
        res.send({ users: objs });
    
    },

    search : async function(req, res) {
        //
        var userName = req.body.username;
        if (typeof username==="undefined"){
            res.json({result: 'error'});
        }
        else{
            var user = await User.findOne({ username : userName });
            res.send({ userObj : user });
        }
    
    },

    delete : async function(req, res) {
        //
        var id = req.body.pid;
        var objs = await User.destroy(id).fetch();
      
        if (objs.length == 0)
            return res.notFound()
        res.json({result: 'success'});
    
    },

    update : async function(req, res) {
        //
        sails.bcrypt = require('bcryptjs');

        var user = req.body;

        const saltRounds = 10;
        const hash = await sails.bcrypt.hash(user.passward, saltRounds);

        if (typeof user === "undefined"){
                return res.badRequest("Form-data not received.");
        }

        var objs = await User.update({id : user.id}).set({
            username: user.username,
            position: user.position,
            password: hash,
            phoneNumber: user.phoneNumber,
        }).fetch();                
      
              if (objs.length == 0) return res.notFound();
              res.json({result: 'success'});
    
    },

    login: async function (req, res) {
    
        if (!req.body.username) return res.badRequest();
        if (!req.body.password) return res.badRequest();
    
        var user = await User.findOne({ username: req.body.username });
    
        if (!user) {
            res.status(401);
            return res.send("User not found");
        }
        
        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) {
            res.status(401);
            return res.send("Wrong Password");
        }
    
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = req.body.username;
    
            sails.log("Session: " + JSON.stringify(req.session) );
            
            // return res.json(req.session);
            
            res.json({result : "Login successfully"});
    
        });
    
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);
            
            res.json({result : "Log out successfully"});
            
        });
    },

};

