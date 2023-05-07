import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import { stringify } from 'querystring';

const app = express();

// cors
app.use(cors({
    origin: "*",
}));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/dummyWrite', (req, res) => {
    let content = JSON.stringify(req.body, null, 2);
    console.log(content);
    fs.writeFile("./test.json", content, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("written");
        }
    });
    res.status(201).send("content");
});

app.get("/dummyRead", (req, res) => {
    let returnContent = {};
    const fname = "./" + req.query.fname;
    console.log(fname);
    fs.readFile(fname, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("failed to read");
        }
        try {
            returnContent = JSON.parse(data);
            console.log(returnContent);
            res.status(200).send(returnContent);
        } catch (err) {
            console.log("Error Parsing");
            res.status(500).send("failed to parse");
        }
    });
});

app.get('/', (req, res) => {
    res.send("Testing Server");
});

app.listen(3001);