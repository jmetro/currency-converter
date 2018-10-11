// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const result = {...context.result};
    const query = {...context.params.query};
    const {from, to, amount} = query;
    const q = `${from.toUpperCase()}_${to.toUpperCase()}`;

    const processed = {
      from, to, amount: +amount,
      total: amount * result[q]
    };

    context = {
      ...context, 
      result: processed
    };

    return context;
  };
};
