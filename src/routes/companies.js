const express = require('express');
const companiesRoutes = express();
const requireAuth = require('../middlewares/requireAuth');
const signup = require('../controllers/companies/signup');

companiesRoutes.post('/companies', signup);
companiesRoutes.post('/companies/signin');
companiesRoutes.use(requireAuth);
companiesRoutes.get('/companies');
companiesRoutes.patch('/companies');
companiesRoutes.delete('/companies');

module.exports = companiesRoutes;
