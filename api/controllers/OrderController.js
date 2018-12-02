/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create : async function(req, res) {

        var order = req.body;
    
        if (order === "undefined")
          return res.badRequest(+"Form-data not received.");
        var newCount = Product.findOne({pid : order.pid}).count;

        await Product.update({pid : order.pid}).set({count : newCount - order.amount});
        //await order.fee.set(Product.findOne({pid : order.pid}).price*order.amount);
        await Order.create(order);
        res.json({result: 'success', order: req.body});
    
    },

    show : async function(req, res) {
        //
        var objs = await Order.find();
        res.json({ orders: objs });
    
    },

    search : async function(req, res, err) {
        // var orderId = req.body.oid;
        // var customerName = req.body.cname;
        // var pNumber = req.body.phoneNumber;
        // var ads = req.body.address;
        // var agent = req.body.owner;
        // var obj = [];
        // var order = req.body;

        // if (order!=="undefined"){
        //     if (orderID!=="undefined"){
        //         obj = await Order.find({
        //             where: { oid : order.oid }
        //         });
        //     }
        //     if (customerName!=="undefined"){
        //         if (obj.length != 0)
        //         obj = await obj.find({
        //             where: { cname : order.oid }
        //         });
        //     }
        //     if (pNumber!=="undefined"){
        //         obj = await obj.find({
        //             where: { phoneNumber : order.oid }
        //         });
        //     }
        //     if (ads!=="undefined"){
        //         obj = await obj.find({
        //             where: { address : order.oid }
        //         });
        //     }
        //     if (agent!=="undefined"){
        //         obj = await obj.find({
        //             where: { owner : order.oid }
        //         });
        //     }
        // }
        // else{
        //     res.json({result: 'error'});
        // }
        // res.send({ order : Obj });
        var order = req.body;
        if (typeof order==="undefined"){
            res.json({result: 'error'});
        }
        else{
            var objs = await Order.find({ owner : order.owner });
            res.send({ orders : objs });
        }
    
    },

    delete : async function(req, res) {
        //
        var id = req.body.id;
        var objs = await Order.destroy(id).fetch();
      
        if (objs.length == 0)
            return res.notFound()
        res.json({result: 'success'});
    
    },

    update : async function(req, res) {
        //
        var order = req.body;
        if (typeof order === "undefined"){
            return res.badRequest("Form-data not received.");
        }

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

