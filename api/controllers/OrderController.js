/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create : async function(req, res) {

        var order = req.body;
    
        if (typeof order === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await order.create(order);
        res.json({result: 'success', order: req.body});
    
    },

    Search : async function(req, res, err) {
        //
        var orderId = req.params.oid;
        var customerName = req.params.cname;
        if (typeof customerName==="undefined"&&typeof orderId!=="undefined"){
            var obj = await Order.findOne(req.params.oid);
            res.send({ order: obj });
            var pObj = await Order.find(objs.pid);
            res.send({ product: pObj });
        }
        if (typeof customerName!=="undefined"&&typeof orderId==="undefined"){
            var objs = await Order.find(req.params.cname);
            res.send({ orders: objs });
            var pObj = await Order.find(objs.pid);
            res.send({ product: pObj });
        }
        else{
            return err;
        }
    
    },

    delete : async function(req, res) {
        //
        var id = req.params.oid;
        var objs = await Product.destroy(id).fetch();
      
        if (objs.length == 0) 
        return res.notFound();
    
        res.redirect('/')
    
    },

    update : async function(req, res) {
        //
        var order = req.body;
        if (typeof order === "undefined")
                return res.badRequest("Form-data not received.");
    
                var objs = await Order.update(req.params.oid).set({
                  oid: order.oid,
                  date: order.date,
                  cname: order.cname,
                  pid: order.pid,
                  fee: order.fee,
                  confirmedState: order.confirmedState,
              }).fetch();
      
              if (objs.length == 0) return res.notFound();
    
    },

};

