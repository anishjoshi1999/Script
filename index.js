const axios = require("axios");

const corn = require("node-cron");

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

let times = 0;
var task = corn.schedule("*/5 * * * * *", async () => {
  await hitCountRoute();
  times = times + 1;
  console.log(`hitCountRoute called: ${times} times.`);
});
task.start();
