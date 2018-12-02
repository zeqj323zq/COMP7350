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

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  await User.createEach([
    { "username": "admin", "password": "123456" },
    { "username": "boss", "password": "123456" }
    // etc.
  ]);
    
  await Order.createEach([
    { oid: "201812101", date: "2018/12/1", cname: "Tom", phoneNumber: "13564", address:"China,HongKong,xxroad", pid:"bag1", amount:2, fee:40, confirmedState:false, owner: "Agent1"},
    { oid: "201812102", date: "2018/12/1", cname: "Ant", phoneNumber: "1353523", address:"China,HongKong,bbroad", pid:"bag2", amount:1, fee:30, confirmedState:false, owner: "Agent2"},
    { oid: "201812103", date: "2018/12/1", cname: "Tom", phoneNumber: "13564", address:"China,HongKong,xxroad", pid:"bag2", amount:3, fee:80, confirmedState:false, owner: "Company"},
    { oid: "201812104", date: "2018/12/1", cname: "Bob", phoneNumber: "135123", address:"China,HongKong,aaroad", pid:"bag1", amount:4, fee:120, confirmedState:true,  owner: "Company"},
    // etc.
  ]);

  await Product.createEach([
    { pid: "bag1", img: "xxx", pType: "shoulderBag", color: "black", size:"medium", price:40, count:20},
    { pid: "bag2", img: "xxx", pType: "backpack", color: "yellow", size:"small", price:60, count:50},
    // etc.
  ]);

  await Message.createEach([
    { owner: "Agent1", content: "Good product today!", pid: "bag1"},
    { owner: "Agent2", content: "Thsi one is really good！", pid: "bag2"},
    { owner: "Company", content: "The new product you never seen0", pid: "bag2"},
    // etc.
  ]);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
