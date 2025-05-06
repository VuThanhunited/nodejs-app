const fs = require("fs");
const path = require("path");

const userFilePath = path.join(__dirname, "../data/userToken.json");
const users = JSON.parse(fs.readFileSync(userFilePath, "utf8"));

module.exports = (req, res, next) => {
  // thêm một biến authorization vào headers
  let token = req.headers.authorization;
  if (!token || !users.find((user) => user.token === token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
