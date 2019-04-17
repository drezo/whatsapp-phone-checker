const { promisify } = require('util');
const { Server } = require('./bin');

const { NODE_ENV, SERVER_PORT } = process.env;

const serverInstance = promisify(Server.listen.bind(Server));

(async () => {
  try {
    await serverInstance(SERVER_PORT);
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at https://localhost:${SERVER_PORT} (mode: ${NODE_ENV})`
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error happened during server start', err);
    process.exit(1);
  }
})();
