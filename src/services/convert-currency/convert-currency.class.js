/* eslint-disable no-unused-vars */
const urls = require('../consts/urls');
const axios = require('axios');
const errors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const {from, to, amount} = params.query;
    const queryCopy = {from, to, amount};
    let badParams = {errors: {}};
    let hasError = false;

    for (var key in queryCopy) {
      if(!queryCopy[key]){
        badParams.errors[key] = 'undefined';
        hasError = true;
      }
    }
    if(isNaN(parseFloat(amount))){
      hasError = true;
      badParams.errors = {
        ...badParams.errors,
        amount: 'Must be a number'
      };
    }
    if(hasError) throw new errors.BadRequest('Invalid Parameters', badParams);
    
    const q = `${from.toUpperCase()}_${to.toUpperCase()}`;
    const res = await axios.get(`${urls.CURRENCY_CONVERTER}?q=${q}&compact=ultra`);

    return res.data;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
