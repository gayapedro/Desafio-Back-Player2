const yup = require('../config/yup');

const signupSchema = yup.object().shape({
  cnpj: yup.string().length(14).required(),
  login: yup.string().required(),
  senha: yup.string().required(),
});

module.exports = signupSchema;
