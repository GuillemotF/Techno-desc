const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config");

exports.register = async (req, res, next) => {
  try {
    const body = req.body;
    const user = new User(body);
    const savedUser = await user.save();
    res.status(201).send(savedUser.transform());
  } catch (error) {
    return next(User.checkDuplicateEmailError(error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndValidatePassword(req.body);
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.secret, { expiresIn: "60s" });
    const refreshToken = jwt.sign(payload, config.secret, { expiresIn: "24h" });
    await User.saveRefreshToken({ email: user.email, refreshToken });
    return res.json({ message: "OK", token, refreshToken });
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const payload = { sub: req.user.id };
    const token = jwt.sign(payload, config.secret, { expiresIn: "60s" });
    const refreshToken = jwt.sign(payload, config.secret, { expiresIn: "24h" });
    await User.saveRefreshToken({ email: req.user.email, refreshToken });
    return res.json({ message: "OK", token, refreshToken });
  } catch (error) {
    next(error);
  }
};
