/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create : async function(req, res, next) {

        var order = JSON.parse(req.body);
    
        if (typeof order === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await order.create(order);
        res.json({result: 'success', order: req.body});
    
        next();
    
    },

    show : async function(req, res, next) {
        //
        var objs = await Order.find();
        res.send(JSON.stringify({ orders: objs }));
    
        next();
    
    },

    delete : async function(req, res, next) {
        //
        var id = JSON.parse(req.params.oid);
        var objs = await Product.destroy(id).fetch();
      
        if (objs.length == 0) 
        return res.notFound();
    
        res.redirect('/')
    
        next();
    
    },

    update : async function(req, res, next) {
        //
        var order = JSON.parse(req.body);
        if (typeof order === "undefined")
                return res.badRequest("Form-data not received.");
    
                var objs = await Order.update(JSON.parse(req.params.oid)).set({
                  oid: order.oid,
                  date: order.date,
                  pType: product.pType,
                  color: product.color,
                  size: puduct.size,
                  price: product.price,
                  count: product.count,
              }).fetch();
      
              if (objs.length == 0) return res.notFound();
    
        next();
    
    },

};

