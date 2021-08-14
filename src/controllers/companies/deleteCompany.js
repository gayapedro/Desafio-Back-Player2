const knex = require('../../database/dbConnection');

const deleteCompany = async (req, res) => {
  const { userId } = req;

  try {
    await knex('socios').del().where({ id_empresa: userId });
    await knex('cnaes_secundarias').del().where({ id_empresa: userId });
    await knex('usuarios').del().where({ id_empresa: userId });
    await knex('empresas').del().where({ id: userId });
    return res.status(200).json('Empresa excluída com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = deleteCompany;
