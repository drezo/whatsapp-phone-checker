const { createServer } = require('http');
const App = require('./app');

module.exports = createServer(App.callback());
