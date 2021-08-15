const knex = require('../../database/dbConnection');
const editSchema = require('../../schemas/editSchema');

const editCompany = async (req, res) => {
  try {
    await editSchema.validate(req.body);
    await knex('empresas').update(req.body).where({ id: req.userId });
    return res.status(200).json('Alterado com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = editCompany;
