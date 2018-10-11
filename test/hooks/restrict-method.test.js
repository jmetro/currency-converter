const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const restrictMethod = require('../../src/hooks/restrict-method');
const errors = require('@feathersjs/errors');

describe('\'restrictMethod\' hook', () => {
  let app;
  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: restrictMethod()
    });
  });

  it('It should restrict the method', async () => {
    try{
      await app.service('dummy').get('test');
    }catch (e){
      const methodNotAllowed = new errors.MethodNotAllowed('Method not allowed');
      assert.deepEqual(e.code, methodNotAllowed.code); 
      assert.deepEqual(e.message, methodNotAllowed.message); 
    }
  });
});
