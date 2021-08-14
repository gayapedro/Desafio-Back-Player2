const knex = require('../../database/dbConnection');
const bcrypt = require('bcrypt');
const signupSchema = require('../../schemas/signupSchema');
const axios = require('axios');

const signup = async (req, res) => {
  const { cnpj, login, senha } = req.body;

  try {
    await signupSchema.validate(req.body);

    const isAlreadySignedUp = await knex('empresas').where({ cnpj });
    const loginTaken = await knex('usuarios').where({ login });

    if (isAlreadySignedUp.length > 0) {
      return res.status(400).json('A empresa já é cadastrada.');
    }

    if (loginTaken.length > 0) {
      return res.status(400).json('Login em uso.');
    }

    const response = await axios
      .get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
      .catch(() => {
        return res.status(400).json('CNPJ inválido.');
      });

    const { cnaes_secundarias, qsa, ...companyInfo } = response.data;

    const companyInsert = await knex('empresas').insert(companyInfo);

    const encryptedPassword = await bcrypt.hash(senha, 10);
    await knex('usuarios').insert({
      login,
      senha: encryptedPassword,
      id_empresa: companyInsert,
    });

    if (cnaes_secundarias.length > 0) {
      for (const cnae of cnaes_secundarias) {
        cnae.id_empresa = companyInsert;
        await knex('cnaes_secundarias').insert(cnae);
      }
    }

    if (qsa.length > 0) {
      for (const partner of qsa) {
        partner.id_empresa = companyInsert;
        const { cnpj, ...partnerInfo } = partner;
        await knex('socios').insert(partnerInfo);
      }
    }

    return res.status(200).json('Empresa cadastrada com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = signup;
