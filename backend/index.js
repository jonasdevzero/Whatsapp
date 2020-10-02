import express from 'express';
import cors  from 'cors';

const app = express();
const DOOR = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Server Running')
});

app.listen(DOOR, _ => console.log(`Server running on door: ${DOOR}`));