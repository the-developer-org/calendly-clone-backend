const Util = require('../util/util');
const util = new Util();
const adminService = require('../services/adminService');
const {
  generateHashPassword,
  generateToken,
  checkPassword,
} = require('../util/helperFunctions');

const authController = {
  // sign up for admin
  signUp: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      util.setError('500', 'Error in creating account');
      return util.send({});
    }

    try {
      const findAdmin = await adminService.findAdminByEmail(email);

      // if the admin is already present
      if (findAdmin) {
        util.setError('500', 'Admin already exists');
        return util.send({});
      }
      // generating the hash password
      const hashPassword = await generateHashPassword(password, 10);
      // creating the admin
      await adminService.createAdmin(name, email, hashPassword);
      // generating the token
      const generatedToken = generateToken({ email, password });

      util.setSuccess(200, 'Account created', {
        token: generatedToken,
        name,
        email,
      });
      return util.send(res);
    } catch (error) {
      util.setError('500', 'Error in creating account');
      return util.send({});
    }
  },

  // login for admin
  logIn: async (req, res) => {
    const { email, password } = req.body;

    // if something comming null
    if (!email || !password) {
      util.setError('500', 'Error while login');
      return util.send({});
    }

    try {
      // finding the admin in database
      const findAdmin = adminService.findAdminByEmail(email);
      if (!findAdmin) {
        util.setError('500', 'Admin not found');
        return util.send({});
      }

      // matching the passwords
      const checkPwd = await checkPassword(password, findAdmin.password);
      if (!checkPwd) {
        util.setError('500', 'Wrong Password');
        return util.send({});
      }

      // generating tokens
      const generatedToken = generateToken({ email, password });
      util.setSuccess(200, 'login success', {
        token: generatedToken,
        name: findAdmin.name,
        email: findAdmin.email,
      });

      return util.send(res);
    } catch (error) {
      util.setError('500', 'Error while login');
      return util.send({});
    }
  },
};

module.exports = authController;
