/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

/*var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var router = express();
var jsonParser = bodyParser.json();

//allow custom header and CORS
router.all('*',function (req, res, ) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      ();
    }
  })

.use(cors())

.use(function(req, res, ) {

    var err = new Error('Not Found');
    err.status = 404;

    (err);

})

// error handler
.use(function(err, req, res, ) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

})*/

/*.get('http://localhost:8080/show', 

.post('http://localhost:8080/edit', 

.post('http://localhost:8080/update', */

module.exports = {

    create : async function(req, res) {

        var product = req.body;
    
        if (typeof product === "undefined")
          return res.badRequest(+"Form-data not received.");
    
        await Product.create(product);
        res.json({result: 'success', product: req.body});
    
    },

    show : async function(req, res) {
        //
        var objs = await Product.find();
        res.send({ products: objs });
    
    },

    search : async function(req, res) {
        //
        var productId = req.body.pid;
        if (typeof productId==="undefined"){
            res.json({result: 'error'});
        }
        else{
            var obj = await Product.findOne({ pid : productId });
            res.send({ product : obj });
        }
    
    },

    delete : async function(req, res) {
        //
        var id = req.body.id;
        var objs = await Product.destroy(id).fetch();
      
        if (objs.length == 0) 
        res.json({result: 'success'});
    },

    update : async function(req, res) {
        //
        var product = req.body;
        if (typeof product === "undefined"){
                return res.badRequest("Form-data not received.");
        }
        var objs = await Product.update({id : product.id}).set({
            pid: product.pid,
            pType: product.pType,
            color: product.color,
            size: product.size,
            price: product.price,
            count: product.count,
        }).fetch();
        
      
              if (objs.length == 0) return res.notFound();
              res.json({result: 'success'});
    
    },

};

