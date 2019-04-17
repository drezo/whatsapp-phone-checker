const { promisify } = require('util');
const { Server } = require('./bin');

const serverInstance = promisify(Server.listen.bind(Server));

const { SERVER_PORT } = process.env;

(async () => {
  try {
    await serverInstance(SERVER_PORT);
    // eslint-disable-next-line no-console
    console.log('Server Running!');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error happened during server start', err);
    process.exit(1);
  }
})();
