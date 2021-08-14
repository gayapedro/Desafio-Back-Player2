const knex = require('../../database/dbConnection');

const listCompanies = async (req, res) => {
  try {
    const companies = await knex('empresas');
    const cnaes = await knex('cnaes_secundarias');
    const partners = await knex('socios');

    const cnaesObject = cnaes.map((item) => {
      return Object.assign({}, item);
    });

    const partnersObject = partners.map((item) => {
      return Object.assign({}, item);
    });

    const companiesList = companies.map((item) => {
      const companyObject = Object.assign({}, item);
      const { id, ...companyInfo } = companyObject;

      const cnaesMatch = cnaesObject.filter((item) => item.id_empresa === id);
      const partnersMatch = partnersObject.filter(
        (item) => item.id_empresa === id
      );

      const cnaesRemoveId = cnaesMatch.map((item) => {
        const { id, id_empresa, ...infocnaes } = item;
        return infocnaes;
      });

      const partnersRemoveId = partnersMatch.map((item) => {
        const { id, id_empresa, ...infopartner } = item;
        return infopartner;
      });

      companyInfo.cnaes_secundarios = cnaesRemoveId;
      companyInfo.qsa = partnersRemoveId;

      return companyInfo;
    });
    return res.status(200).json(companiesList);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = listCompanies;
