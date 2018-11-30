/**
 * Customer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    cname: {
      type: "string"
    },

    oid: {
      type: "json"
    },

    phoneNumber: {
      type: "number"
    },

    address: {
      type: "string"
    },

  },

};

