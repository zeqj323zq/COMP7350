/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    async create(req, res) {

        var product = req.body;
    
        if (typeof product === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await Product.create(product);
        res.json({result: 'success', product: req.body});
    
    },

    async show(req, res) {
        //
        var objs = await Product.find();
        res.send({ products: objs });
    
    },

    async delete(req, res, ) {
        //
        var id = req.params.pid;
        var objs = await Product.destroy(id).fetch();
      
        if (objs.length == 0) 
        return res.notFound();
    
        res.redirect('/')
    
    },

    async update(req, res) {
        //
        var product = req.body;
        if (typeof product === "undefined")
                return res.badRequest("Form-data not received.");
    
                var objs = await Product.update(req.params.pid).set({
                  pid: product.pid,
                  imgUrl: product.imgUrl,
                  pType: product.pType,
                  color: product.color,
                  size: puduct.size,
                  price: product.price,
                  count: product.count,
              }).fetch();
      
              if (objs.length == 0) return res.notFound();
    
    },

};