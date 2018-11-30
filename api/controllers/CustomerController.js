/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var router = express();
var jsonParser = bodyParser.json();

//allow custom header and CORS
router.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });

router.use(cors());

router.use(function(req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;

    next(err);

});

// error handler
router.use(function(err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

});

router.post('http://localhost:8080/create', jsonParser, async function(req, res, next) {

    var product = JSON.parse(req.body);

    if (typeof product === "undefined")
      return res.badRequest(+"Form-data not received.");

    await Product.create(product);
    res.json({result: 'success', product: req.body});

    next();

});

router.get('http://localhost:8080/show', async function(req, res, next) {
    //
    var objs = await Product.find();
    res.send(JSON.stringify({ products: objs }));

    next();

});

router.post('http://localhost:8080/edit', jsonParser, async function(req, res, next) {
    //
    var id = JSON.parse(req.params.pid);
    var objs = await Product.destroy(id).fetch();
  
    if (objs.length == 0) 
    return res.notFound();

    res.redirect('http://localhost:8080/delete')

    next();

});

router.post('http://localhost:8080/update', jsonParser, async function(req, res, next) {
    //
    var product = JSON.parse(req.body);
    if (typeof product === "undefined")
            return res.badRequest("Form-data not received.");

            var objs = await Product.update(JSON.parse(req.params.pid)).set({
              pid: product.pid,
              pType: product.pType,
              color: product.color,
              size: puduct.size,
              price: product.price,
              booked: product.booked,
          }).fetch();
  
          if (objs.length == 0) return res.notFound();

    next();

});

module.exports = {
    router
};

