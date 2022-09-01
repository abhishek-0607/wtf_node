const app = require("./app");
const connect = require("./configs/db");

app.listen(8888, async function () {
  await connect();
  console.log("Listening to port 8888");
});
