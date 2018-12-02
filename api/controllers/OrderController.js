/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create : async function(req, res) {

        var order = req.body;
        var newCount = Product.findOne({pid : order.pid}).count;
    
        if (typeof order === "undefined")
          return res.badRequest(+"Form-data not received.");

        await Product.update({pid : order.pid}).set({count : newCount - order.amount});
        await order.create(order);
        //await order.fee.set(Product.findOne({pid : order.pid}).price*order.amount);
        res.json({result: 'success', order: req.body});
    
    },

    show : async function(req, res) {
        //
        var objs = await Order.find();
        res.json({ orders: objs });
    
    },

    search : async function(req, res, err) {
        //
        var orderId = req.params.oid;
        var customerName = req.params.cname;
        var pNumber = req.params.phoneNumber;
        var ads = req.params.address;
        var agent = req.params.owner;
        if (typeof customerName!=="undefined"||typeof orderId!=="undefined"||typeof phoneNumber!=="undefined"||typeof address!=="undefined"||typeof agent!=="undefined"){
            var obj = await Order.find({
                where: { oid : orderId, cname : customerName, phoneNumber : pNumber, address : ads, owner : agent}
            });
                res.send({ order : obj });
            //var pObj = await Order.find(objs.pid);
            //res.send({ product: pObj });
        }
        /*if (typeof customerName!=="undefined"&&typeof orderId==="undefined"){
            var obj = await Order.find({
                where: { cname : customerName }
            });
                res.send({ orders : obj });
            //var pObj = await Order.find(objs.pid);
            //res.send({ product: pObj });
        }*/
        else{
            res.json({result: 'error'});
        }
    
    },

    delete : async function(req, res) {
        //
        var id = req.body.id;
        var objs = await Order.destroy(id).fetch();
      
        if (objs.length == 0) 
        return res.notFound();
    
        res.json({result: 'success'});
        //res.redirect('/')
    
    },

    update : async function(req, res) {
        //
        var order = req.body;
        if (typeof order === "undefined")
            return res.badRequest("Form-data not received.");
        var objs = await Order.update({id : order.id}).set({
            oid: order.oid,
            date: order.date,
            cname: order.cname,
            phoneNumber: order.phoneNumber,
            address: order.address,
            pid: order.pid,
            fee: order.fee,
            owner: order.owner,
            confirmedState: order.confirmedState,
        }).fetch();
        if (objs.length == 0) return res.notFound();
        res.json({result: 'success'});
    },

    totalSales : async function(req, res) {

        var objs = await Order.find();
        var sale = 0;

        for(k in objs){
            sale = sale + orders.fee
        }
        res.send(sale);
    
    },

};

