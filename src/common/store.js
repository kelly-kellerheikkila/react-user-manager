if (process.env.NODE_ENV === 'production') {
  // noinspection Eslint
  module.exports = require('./store.prod');
} else {
  // noinspection Eslint
  module.exports = require('./store.dev');
}
