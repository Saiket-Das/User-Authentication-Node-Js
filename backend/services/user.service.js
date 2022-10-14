const User = require("../models/user.model");

exports.registerService = async (userInfo) => {
  const result = await User.create(userInfo);
  console.log(result);

  return result;
};

exports.findUserByEmail = async (email) => {
  const result = await User.findOne({ email });
  console.log(result);

  return result;
};

exports.findUserById = async (userId) => {
  const result = await User.findById(userId);
  return result;
};

exports.userProfileUpdateService = async (userId, updateInfo) => {
  const result = await User.findByIdAndUpdate({ _id: userId }, updateInfo, {
    runValidators: true,
  });
  return result;
};

exports.getAllUsersService = async () => {
  const result = await User.find();
  return result;
};
