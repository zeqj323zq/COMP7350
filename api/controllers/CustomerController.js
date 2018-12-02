/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create : async function(req, res) {

        var customer = req.body;
    
        if (typeof customer === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await Customer.create(customer);
        res.json({result: 'success', customer: req.body});
    
    },

    show: async function(req, res) {
        //
        var objs = await Customer.find();
        res.send({ customers: objs });
    
    },

    delete : async function(req, res) {
        //
        var id = req.body.id;
        var objs = await Customer.destroy(id).fetch();     
      
        if (objs.length == 0) 
            return res.notFound()
        res.json({result: 'success'});
   
    },

    update : async function(req, res) {
        //
        var customer = req.body;
        if (typeof customer === "undefined"){
                return res.badRequest("Form-data not received.");
        }
        var objs = await Customer.update({id : customer.id}).set({
            cname: customer.cname,
            oid: customer.oid,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
        }).fetch();
                
      
              if (objs.length == 0) return res.notFound();
              res.json({result: 'success'});
    
    },

};