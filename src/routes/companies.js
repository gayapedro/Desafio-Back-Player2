const express = require('express');
const companiesRoutes = express();
const requireAuth = require('../middlewares/requireAuth');
const signup = require('../controllers/companies/signup');
const signin = require('../controllers/companies/signin');
const deleteCompany = require('../controllers/companies/deleteCompany');
const listCompanies = require('../controllers/companies/listCompanies');

companiesRoutes.post('/companies', signup);
companiesRoutes.post('/companies/signin', signin);
companiesRoutes.use(requireAuth);
companiesRoutes.get('/companies', listCompanies);
companiesRoutes.patch('/companies');
companiesRoutes.delete('/companies', deleteCompany);

module.exports = companiesRoutes;
