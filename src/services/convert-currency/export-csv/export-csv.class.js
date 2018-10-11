const urls = require('../../consts/urls');
const axios = require('axios');
const errors = require('@feathersjs/errors');
/* eslint-disable no-unused-vars */
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


    const toList = to.split(',') || [];
    let res = {};
    for(const [i, curr] of toList.entries()){
      if(i % 2 === 1){
        const q = [];
        q.push(`${from.toUpperCase()}_${curr.toUpperCase()}`);
        q.push(`${from.toUpperCase()}_${toList[i - 1].toUpperCase()}`);
        try{
          const data = (await axios.get(`${urls.CURRENCY_CONVERTER}?q=${q.join(',')}&compact=ultra`)).data;
          res = {...res, ...data};
        }catch(e){
          console.error(e);
        }
      }else if(i === (toList.length - 1)){
        const q = `${from.toUpperCase()}_${toList[i].toUpperCase()}`;
        try{
          const data = (await axios.get(`${urls.CURRENCY_CONVERTER}?q=${q}&compact=ultra`)).data;
          res = {...res, ...data};
        }catch(e){
          console.error(e);
        }
      }
    }
    for(const curr in res){
      res[curr] *= amount;
    }
    return res;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
