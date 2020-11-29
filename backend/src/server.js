import 'dotenv';
import express, { json } from 'express';
const app = express();
import cors from 'cors';
import routes from './routes';
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(json());

app.use(routes);

app.listen(PORT, _ => console.log(`Server running on door: ${PORT}`));