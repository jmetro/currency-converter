const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processCurrencyRes = require('../../src/hooks/process-currency-res');

describe('\'processCurrencyRes\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async find(params) {
        params.query = {
          from: 'usd',
          to: 'php',
          amount: 1
        };
        return {
          'USD_PHP': 50
        };
      }
    });

    app.service('dummy').hooks({
      after: processCurrencyRes()
    });
  });

  it('processed currency api result', async () => {
    const result = await app.service('dummy').find();
    assert.deepEqual(result, {
      'from': 'usd',
      'to': 'php',
      'amount': 1,
      'total': 50
    });
  });
});
