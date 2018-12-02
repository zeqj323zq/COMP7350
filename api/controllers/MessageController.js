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
    
        await Message.create(msg);
        res.json({result: 'success', msg: req.body});
    
    },

    show : async function(req, res) {
        //
        var msgs = await Message.find();
        res.send({ messages: msgs });
    
    },

    delete : async function(req, res) {
        //
        var id = req.body.id;
        var objs = await Product.destroy(id).fetch();
      
        if (objs.length == 0) 
        return res.notFound();
        res.json({result: 'success'});
    },

    update : async function(req, res) {
        //
        var message = req.body;
        if (typeof product === "undefined")
                return res.badRequest("Form-data not received.");
    
                var objs = await Message.update({id : message.id}).set({
                  owner: message.owner,
                  content: message.content,
                  pid: message.pid,
              }).fetch();
      
              if (objs.length == 0) return res.notFound();
              res.json({result: 'success'});
    
    },

    personalSale : async function(req, res) {
        var msg = req.body;
        var orders = await Order.find({owner : msg.owner});
        var sale = 0;

        for(k in orders){
            sale = sale + orders.fee
        }
        res.send(sale);
    }

};

