const assert = require('assert');

const app = require('../../src/app');

describe('\'convertCurrency\' service', () => {
  let service;
  let forErrorService;
  beforeEach(() => {
    service = app.service('convert-currency');
    forErrorService = app.service('convert-currency');
    service.hooks({
      before: ctx => {
        ctx.params.query = {
          from: 'usd',
          to: 'php',
          amount: 1
        };
        return ctx;
      }
    });
  });
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });
  it('Returns result', async () => {
    const serviceRes = await service.find();
    assert.ok(serviceRes);
  });
  it('error on undefined params', async () => {
    forErrorService.hooks({
      before: ctx => {
        ctx.params.query = {
          from: null,
          to: null,
          amount: null
        };
        return ctx;
      }
    });
    assert.throws(service.find, 'Invalid Parameters');
  });
});
