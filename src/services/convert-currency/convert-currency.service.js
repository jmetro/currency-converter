// Initializes the `convertCurrency` service on path `/convert-currency`
const createService = require('./convert-currency.class.js');
const hooks = require('./convert-currency.hooks');

module.exports = function (app) {
  const options = {
    
  };

  // Initialize our service with any options it requires
  app.use('/convert-currency', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('convert-currency');

  service.hooks(hooks);
};
