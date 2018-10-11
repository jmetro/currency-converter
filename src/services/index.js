const convertCurrency = require('./convert-currency/convert-currency.service.js');
const convertCurrencyExportCsv = require('./convert-currency/export-csv/export-csv.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  //app.configure(express.rest(convertCurrencyExportCsv));
  app.configure(convertCurrencyExportCsv);
  app.configure(convertCurrency);
};
