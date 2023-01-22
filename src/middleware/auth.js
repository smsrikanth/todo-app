import jwt from 'jsonwebtoken';
import CONSTANTS from '../constants.js';
import User from '../models/user.js';

const authenticate = async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log({ body: req.body });
    const user = await User.findOne({
      email,
      password: await encryptPassword(password),
    });
    if (user) {
      jwt.sign(
        { email: user.email, userId: user._id },
        'test', // TODO
        { expiresIn: 5 }, // TODO
        (err, token) => {
          if (!err) {
            req.session.token = token;
            res.send({ message: CONSTANTS.LOGIN_SUCCESS });
          } else {
            res.status(400).send({
              message: CONSTANTS.SIGN_IN_TOKEN_FAILURE,
            });
          }
        }
      );
    } else {
      res.status(400).send({
        message: CONSTANTS.USERNAME_OR_PASSWORD_INCORRECT_FAILURE,
      });
    }
  } catch (err) {}
};

const verifyToken = async (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.status(403).send({ message: CONSTANTS.TOKEN_REQUIRED_FAILURE });
  }
  jwt.verify(token, 'test', (err, decoded) => {
    if (!err) {
      req.userId = decoded.userId;
      next();
    } else {
      req.session = null;
      return res.status(401).send({
        message: CONSTANTS.TOKEN_VERIFY_FAILURE,
      });
    }
  });
};

const verifySignUp = async (req, res) => {
  try {
    const { username, password, roles, email } = req.body;
    if (!username) {
      return res
        .status(400)
        .send({ message: CONSTANTS.USER_NAME_REQUIRED_FAILURE });
    }
    if (!email) {
      return res
        .status(400)
        .send({ message: CONSTANTS.EMAIL_REQUIRED_FAILURE });
    }
    if (!password) {
      return res
        .status(400)
        .send({ message: CONSTANTS.PASSWORD_REQUIRED_FAILURE });
    }

    const users = await User.find({ $or: [{ username }, { email }] });
    if (users.length > 0) {
      return res.status(400).send({
        message: CONSTANTS.USER_NAME_OR_EMAILS_EXISTS_FAILURE,
      });
    }
    const user = new User({ username, password, email });
    console.log({ user });
    await user.save();
    res.send({ message: CONSTANTS.USER_SIGN_UP_SUCCESS });
  } catch (err) {
    res.status(500).send({ message: CONSTANTS.SIGN_UP_FAILURE });
    console.log(err);
  }
};

const encryptPassword = async (password) => {
  return password;
};

export { authenticate, verifyToken, verifySignUp };