import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import { stringify } from 'querystring';
import sdk from "aws-sdk";
import dotenv from "dotenv";

// -----AWS Configurations-----

dotenv.config();

sdk.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new sdk.DynamoDB.DocumentClient();
const TABLE_NAME = "SapphireUsers";

// -----AWS Configurations-----

const app = express();

// cors
app.use(cors({
    origin: "*",
}));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// functionality to get user data by ID
const getUserById = async (userID) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userID
        }
    }
    return await dynamoClient.get(params).promise();
}

// functionality to update user data
const addOrUpdateUser = async (userData) => {
    const params = {
        TableName: TABLE_NAME,
        Item: userData
    }
    return await dynamoClient.put(params).promise();
}

// get user by ID
app.get('/getUserById', (req, res) => {
    if (req.query.userID == undefined || req.query.userID == "") {
        res.status(400).send("Variable userID cannot be empty");
    } else {
        getUserById(req.query.userID).then((result) => {
            if (JSON.stringify(result) == "{}") {
                console.log("No users Found");
                res.status(400).send(result);
            } else {
                console.log(result);
                res.status(200).send(result.Item);
            }
        });
    }
});

// add new user
app.put('/addOrUpdateUser', (req, res) => {
    let content = req.body;
    if (content == undefined || JSON.stringify(content) == {}) {
        res.status(400).send("Input cannot be empty");
    } else if (content.userID == undefined || content.userID == "") {
        res.status(400).send("Variable userID cannot be empty");
    }
    addOrUpdateUser(content).then((result) => {
        res.status(200).send("Added to DB");
    });
});

app.get("/getHealthiness", (req, res) => {
    const inputData = req.query.userData;
    console.log(inputData);
})

// - format is [start, end, id] start end inclusive
// - ignore all task id=3
// 3 ways to lose points
// 1: if chunk is more than 2 hrs with no breaks -1 per slot
// 2: -1 pt * (days scheduled after due date inclusive) * number of slots
// 3: more than 8 hrs of total work per day, -1 pt per slot after the 8 hr mark
// score from 0-100

app.get("/getHealthinessScore", (req, res) => {
    let content = req.body;
    restart.status(200).send("Not implemented yet in backend");
});

app.get('/', (req, res) => {
    res.send("Testing Server");
});

app.listen(3001);


// Test Code Here (Do not uncomment unless for testing)

// app.post('/dummyWrite', (req, res) => {
//     let content = JSON.stringify(req.body, null, 2);
//     console.log(content);
//     fs.writeFile("./test.json", content, err => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("written");
//         }
//     });
//     res.status(201).send("content");
// });

// app.get("/dummyRead", (req, res) => {
//     let returnContent = {};
//     const fname = "./" + req.query.fname;
//     console.log(fname);
//     fs.readFile(fname, "utf-8", (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send("failed to read");
//         }
//         try {
//             returnContent = JSON.parse(data);
//             console.log(returnContent);
//             res.status(200).send(returnContent);
//         } catch (err) {
//             console.log("Error Parsing");
//             res.status(500).send("failed to parse");
//         }
//     });
// });

// // get all users
// const getAllUsers = async () => {
//     const params = {
//         TableName: TABLE_NAME
//     };
//     const result = await dynamoClient.scan(params).promise();
//     console.log(result.Items[0].TOWN);
//     return result;
// }

// getAllUsers();

// const dummyData =
// {
//     "userID": "testUserID",
//     "email": "testing@test.com",
//     "username" : "test",
//     "TOKENS": 473.63,
//     "AVAILABILITY": {
//     "0": [],
//     "1": [],
//     "2": [],
//     "3": [],
//     "4": [],
//     "5": [],
//     "6": []
//     },
//     "RESPONSIBILITYORDER": [
//     "100"
//     ],
//     "RESPONSIBILITIES": {
//     "100": {
//         "NAME": "Miscellaneous",
//         "COLOR": "#999999",
//         "TASKS": []
//     }
//     },
//     "TASKS": {},
//     "SCHEDULEDTIME": {},
//     "TOWN": {
//     "MAP": [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 110, 0, 0, 0, 0, 0],
//     [0, 0, 16, 15, 17, 111, 0, 0, 0, 0, 0, 16, 15, 15, 15, 17, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 13, 0, 14, 0, 0, 1, 0, 0, 0, 13, 0, 0, 0, 9, 15, 17, 0, 19, 18, 0, 0, 0],
//     [0, 0, 13, 0, 14, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0],
//     [0, 0, 11, 10, 12, 50, 51, 4, 0, 0, 0, 13, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0,52, 53, 0, 0, 0, 0, 11, 18, 0, 19, 10, 10, 12, 0, 0, 111, 0, 0, 0],
//     [0, 26, 27, 0, 2, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 18, 0, 0, 0, 0, 0],
//     [0, 28, 29, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0],
//     [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [21, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [20, 25, 21, 21, 21, 21, 21, 21, 23, 0, 0, 0, 0, 22, 21, 21, 21, 21, 23, 0, 0, 0, 0, 0],
//     [20, 20, 20, 20, 20, 20, 20, 20, 25, 21, 21, 21, 21, 24, 20, 20, 20, 20, 25, 21, 21, 21, 21, 21]],
//     "POPULATION": 1
//   }
// }
