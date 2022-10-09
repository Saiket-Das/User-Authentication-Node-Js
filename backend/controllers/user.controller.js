const { registerService } = require("../services/user.service");

exports.register = async (req, res, next) => {
  try {
    const user = await registerService(req.body);

    res.status(200).json({
      success: true,
      message: "Successfully sign up",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
