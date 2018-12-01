/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: "string"
    },

    position: {
      type: "string",
      enum: ["admin", "finance", "marketing", "inventory", "humanRecourse", "agent"],
      defaultsTo: "visitor"
    },

    phoneNumber: {
      type: "number"
    },

    address: {
      type: "string"
    },

  },

};

