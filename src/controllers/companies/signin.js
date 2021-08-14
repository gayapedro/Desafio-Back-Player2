const knex = require('../../database/dbConnection');
const bcrypt = require('bcrypt');
const signinSchema = require('../../schemas/signinSchema');
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {
  const { login, senha } = req.body;

  try {
    await signinSchema.validate(req.body);
    const userExists = await knex('usuarios').where({ login }).first();

    if (!userExists) {
      return res.status(400).json('Usuário ou senha incorretos.');
    }

    const passwordVerified = await bcrypt.compare(senha, userExists.senha);

    if (!passwordVerified) {
      return res.status(400).json('Usuário ou senha incorretos.');
    }

    const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET);

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = signin;
