/**
 * Message.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    owner: {
      type: "string"
    },

    content: {
      type: "string"
    },

    pid: {
      type: "string"
    }
    
  },

};

