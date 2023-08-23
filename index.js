const axios = require("axios");

module.exports = async (req, res) => {
  try {
    let response = await axios.get(
      `https://tame-gray-scorpion-hem.cyclic.cloud/count`
    );
    console.log("Count:", response.data.count);
    res.status(200).json({ message: "Request processed successfully" });
  } catch (error) {
    console.error("Error hitting count route:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};
