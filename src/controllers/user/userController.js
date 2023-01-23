import { createUserService } from '../../services/userServices.js';
import User from '../../models/user.js';
import CONSTANTS from '../../constants.js';

const createUser = async function (req, res, error) {
  try {
    // console.log('create user controller');
    const user = new User();
    user.name = req.query.name;
    await createUserService(user);
    return res.json({ message: CONSTANTS.USER_CREATED_SUCCESS });
  } catch (err) {
    res.status(400).send({ msg: `${err._message}` });
    // console.log(err);
  }
};

export { createUser };
