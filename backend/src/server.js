const express = require('express');
const app = express();
const cors  =  require('cors');
const { DOOR } = require('./configs/constants');
const routes = require('./routes');

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(DOOR, _ => console.log(`Server running on door: ${DOOR}`));