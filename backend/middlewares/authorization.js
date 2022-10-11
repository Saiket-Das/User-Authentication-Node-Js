module.exports = (...role) => {
  return (req, res, next) => {
    // Got it from VerifyToken
    const userRole = req.user.role;

    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: "Forbidden",
        message: "Fail",
        error: "You are not authorized to access this",
      });
    }
    next();
  };
};
