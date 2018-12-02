/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
    
  await Order.createEach([
    { oid: "201812101", date: "2018/12/1", cname: "Tom", phoneNumber: "13564", address:"China,HongKong,xxroad", pid:"bag1", amount:2, fee:80, confirmedState:false, owner: "Agent1"},
    { oid: "201812102", date: "2018/12/1", cname: "Ant", phoneNumber: "1353523", address:"China,HongKong,bbroad", pid:"bag2", amount:1, fee:60, confirmedState:false, owner: "Agent2"},
    { oid: "201812103", date: "2018/12/1", cname: "Tom", phoneNumber: "13564", address:"China,HongKong,xxroad", pid:"bag2", amount:3, fee:180, confirmedState:false, owner: "Company"},
    { oid: "201812104", date: "2018/12/1", cname: "Bob", phoneNumber: "135123", address:"China,HongKong,aaroad", pid:"bag1", amount:4, fee:160, confirmedState:true,  owner: "Agent1"},
    { oid: "201812105", date: "2018/12/1", cname: "David", phoneNumber: "135123", address:"China,HongKong,aaroad", pid:"bag1", amount:4, fee:160, confirmedState:true,  owner: "Agent1"},
    { oid: "201812106", date: "2018/12/1", cname: "Jack", phoneNumber: "135457", address:"China,HongKong,aaroad", pid:"bag1", amount:3, fee:120, confirmedState:true,  owner: "Agent2"},
    { oid: "201812107", date: "2018/12/1", cname: "Chirs", phoneNumber: "145677", address:"China,HongKong,aaroad", pid:"bag2", amount:5, fee:300, confirmedState:true,  owner: "Agent2"},
    // etc.
  ]);

  await Product.createEach([
    { pid: "bag1", img: "xxx", pType: "shoulderBag", color: "black", size:"medium", price:40, count:20},
    { pid: "bag2", img: "xxx", pType: "backpack", color: "yellow", size:"small", price:60, count:50},
    // etc.
  ]);

  await Message.createEach([
    { owner: "David", content: "Good product today!", pid: "bag1"},
    { owner: "Frank", content: "Thsi one is really good！", pid: "bag2"},
    { owner: "Company", content: "The new product you never seen0", pid: "bag2"},
    // etc.
  ]);

  const hash = await sails.bcrypt.hash('123456', saltRounds);

  await User.createEach([
    { "username": "Company", "position": "company", "phoneNumber": "123456", "address": "China,HK,xx oad", "password": hash },
    { "username": "Frank", "position": "agent", "phoneNumber": "123456", "address": "China,HK,12 Road", "password": hash },
    { "username": "David", "position": "agent", "phoneNumber": "123456", "address": "China,HK,AB Road", "password": hash },
    // etc.
  ]);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
