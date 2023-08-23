const express = require("express");
const app = express();
const axios = require("axios");
const port = 3000;
const corn = require("node-cron");

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
const hitCountRoute = async () => {
  try {
    let response = await axios.get(
      `https://tame-gray-scorpion-hem.cyclic.cloud/count`
    );
    console.log("Count:", response.data.count);
  } catch (error) {
    console.error("Error hitting count route:", error.message);
  }
};
// Start the server
app.listen(port, () => {
  //setInterval(hitCountRoute, 3000);
  console.log(`Server is running on port ${port}`);
});
let times = 0;
var task = corn.schedule("*/5 * * * * *", async () => {
  await hitCountRoute();
  times = times + 1;
  console.log(`hitCountRoute called: ${times} times.`);
});
task.start();
