// Application hooks that run for every service
const log = require('./hooks/log');
const restrictMethod = require('./hooks/restrict-method');

module.exports = {
  before: {
    all: [log()],
    find: [],
    get: [],
    create: [restrictMethod()],
    update: [restrictMethod()],
    patch: [restrictMethod()],
    remove: [restrictMethod()]
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
