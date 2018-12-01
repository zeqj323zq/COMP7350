/**
 * Order.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    oid: {
      type: "string"
    },

    date: {
      type: 'string'
    },

    cname: {
      type: "string"
    },

    phoneNumber: {
      type: "number"
    },

    address: {
      type: "string"
    },

    pid: {
      type: "String"
    },

    amount: {
      type: "number"
    },

    fee: {
      type: "number"
    },

    owner: {
      type: "string"
    },

    confirmedState: {
      type: "Boolean",
      defaultsTo: 'F'
    },

  },

};

