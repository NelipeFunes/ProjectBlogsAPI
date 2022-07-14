const model = require('../database/models');
const auth = require('./authService');

// const validateInfos = (disNam, email, pass) => {
//   if (disNam.length < 8) {
//     return 'dis length';
//   }
//   if (pass.length < 6) {
//     return 'pass length';
//   }
//   const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
//   if (!regex.test(email)) {
//     return 'invalid email';
//   }
// };

const services = {
  async register(displayName, email, password, image) {
    if (displayName.length < 8) {
      return 'dis length';
    }
    if (password.length < 6) {
      return 'pass length';
    }
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      return 'invalid email';
    }
   const userRegistred = await model.User.findOne({ where: { email, password } });
   if (!userRegistred) {
    const obj = { displayName, email, password, image };
    await model.User.create(obj);
    const token = auth.makeToken(obj);
    return token;
   } 
    return 'user exists';
  },
};

module.exports = services;