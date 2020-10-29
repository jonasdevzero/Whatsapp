const express = require('express');
const app = express();
const cors  =  require('cors');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, _ => console.log(`Server running on door: ${PORT}`));