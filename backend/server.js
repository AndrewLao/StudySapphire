import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Testing Server");
})

app.listen(3001);