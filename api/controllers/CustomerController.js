/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    async create(req, res) {

        var customer = req.body;
    
        if (typeof customer === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await Customer.create(customer);
        res.json({result: 'success', customer: req.body});
    
    },

    async show(req, res) {
        //
        var objs = await Customer.find();
        res.send({ customers: objs });
    
    },

    async delete(req, res) {
        //
        var id = req.body.id;
        var objs = await Customer.destroy(id).fetch();
        res.json({result: 'success'});
      
        if (objs.length == 0) 
        return res.notFound();
   
    },

    async update(req, res) {
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