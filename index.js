const express = require("express");
const app = express();
const axios = require("axios");
const port = 3000; // Choose the port you want your app to run on

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
  setInterval(hitCountRoute, 3000);
  console.log(`Server is running on port ${port}`);
});
