// Initializes the `convert-currency/export-csv` service on path `/convert-currency/export-csv`
const createService = require('./export-csv.class.js');
const hooks = require('./export-csv.hooks');
const json2csv = require('json2csv').Parser;

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use('/convert-currency/export-csv', createService(), (req, res)=>{
    const {from, to, amount} = req.query;
    const headers = from.toUpperCase() + ',' + to.split(',').map(t=>`${from.toUpperCase()}_${t.toUpperCase()}`);
    const data = {[from.toUpperCase()]: amount, ...res.data};
    const csvParser = new json2csv(headers);
    const csv = csvParser.parse(data);

    res.type('csv');
    res.end(csv);
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('convert-currency/export-csv');

  service.hooks(hooks);
};
