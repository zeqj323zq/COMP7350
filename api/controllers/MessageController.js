/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create : async function(req, res) {

        var msg = req.body;
    
        if (typeof msg === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await Messgae.create(product);
        res.json({result: 'success', msg: req.body});
    
    },

    show : async function(req, res) {
        //
        var objs = await Message.find();
        res.send({ Messages: objs });
    
    },

};

