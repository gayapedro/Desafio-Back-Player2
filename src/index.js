require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const companiesRoutes = require('./routes/companies');

app.use(express.json());

app.use(cors());
app.use(companiesRoutes);

app.listen(3000, () => {
  console.log('server running on port 3000');
});
