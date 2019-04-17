const { promisify } = require("util");
const { Server } = require("./bin");

const serverInstance = promisify(Server.listen.bind(Server));

const { SERVER_PORT } = process.env;

(async () => {
  try {
    await serverInstance(SERVER_PORT);
    console.log("Server Running!");
  } catch (err) {
    console.log("Error happened during server start", err);
    process.exit(1);
  }
})();
