/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create : async function(req, res) {

        var user = req.body;
    
        if (typeof user === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await User.create(user);
        res.send({result: 'success', user: req.body});
    
    },

    show : async function(req, res) {
        //
        var objs = await User.find();
        res.send({ users: objs });
    
    },

    delete : async function(req, res) {
        //
        var id = req.params.pid;
        var objs = await User.destroy(id).fetch();
      
        if (objs.length == 0) 
        return res.notFound();
    
    },

    update : async function(req, res) {
        //
        var user = req.body;
        if (typeof user === "undefined")
                return res.badRequest("Form-data not received.");
    
                var objs = await User.update(req.body.username).set({
                  username: user.username,
                  position: user.position,
                  password: user.passward,
                  phoneNumber: user.phoneNumber,
              }).fetch();
              res.json({result: 'success'});
      
              if (objs.length == 0) return res.notFound();
    
    },

};

