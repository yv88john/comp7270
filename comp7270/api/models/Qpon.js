/**
 * Qpon.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: "string"
    },

    restaurant: {
      type: "string"
    },

    region: {
      type:"string"
    },

    mall: {
      type:"string"
    },

    image:{
      type:"string"
    },

    quota:{
      type:"number"
    },

    coins:{
      type:"number"
    },

    expiryDate: {
      type:"string"
    },

    detail: {
      type:"string"
    },

    owners: {
      collection: 'User',
      via: 'qpons'
    }
  },

};

