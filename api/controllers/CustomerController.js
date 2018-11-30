/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    async create(req, res, next) {

        var product = JSON.parse(req.body);
    
        if (typeof product === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await Product.create(product);
        res.json({result: 'success', product: req.body});
    
        next();
    
    },

    async show(req, res, next) {
        //
        var objs = await Product.find();
        res.send(JSON.stringify({ products: objs }));
    
        next();
    
    },

    async delete(req, res, next) {
        //
        var id = JSON.parse(req.params.pid);
        var objs = await Product.destroy(id).fetch();
      
        if (objs.length == 0) 
        return res.notFound();
    
        res.redirect('/')
    
        next();
    
    },

    async update(req, res, next) {
        //
        var product = JSON.parse(req.body);
        if (typeof product === "undefined")
                return res.badRequest("Form-data not received.");
    
                var objs = await Product.update(JSON.parse(req.params.pid)).set({
                  pid: product.pid,
                  imgUrl: product.imgUrl,
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