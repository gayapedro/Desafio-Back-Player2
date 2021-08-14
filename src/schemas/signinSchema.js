const yup = require('../config/yup');

const signinSchema = yup.object().shape({
  login: yup.string().required(),
  senha: yup.string().required(),
});

module.exports = signinSchema;
