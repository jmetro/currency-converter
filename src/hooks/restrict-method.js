// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('@feathersjs/errors');
//module.exports = function (options = {}) {
module.exports = function () {
//return async context => {
  return async () => {
    throw new errors.MethodNotAllowed('Method not allowed');
  };
};
