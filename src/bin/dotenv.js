const dotenv = require("dotenv");
const { join } = require("path");

const path = join(__dirname, "../../.env");

dotenv.config({ path });
