const express = require('express');
const companiesRoutes = express();
const requireAuth = require('../middlewares/requireAuth');
const signup = require('../controllers/companies/signup');
const signin = require('../controllers/companies/signin');

companiesRoutes.post('/companies', signup);
companiesRoutes.post('/companies/signin', signin);
companiesRoutes.use(requireAuth);
companiesRoutes.get('/companies');
companiesRoutes.patch('/companies');
companiesRoutes.delete('/companies');

module.exports = companiesRoutes;
