import User from '../models/user.js';

const createUserService = async function (user) {
  await user.save();
};

export { createUserService };
