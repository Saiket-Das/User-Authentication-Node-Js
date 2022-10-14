const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payload = {
    id: userInfo._id,
    email: userInfo.email,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  return token;
};
