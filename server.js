const app = require("./app");
const connect = require("./src/configs/db");
require("dotenv").config();

const port = process.env.PORT || 8888;

app.listen(port, async function () {
  await connect();
  console.log(`Listening to port ${port}`);
});
