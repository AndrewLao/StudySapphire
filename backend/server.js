import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import { stringify } from 'querystring';
import sdk from "aws-sdk";
import dotenv from "dotenv";
import { time } from 'console';

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

// - format is [start, end, id] start end inclusive
// - ignore all task id=3
// 3 ways to lose points
// 1: if chunk is more than 2 hrs with no breaks -1 per slot
// 2: -1 pt * (days scheduled after due date inclusive) * number of slots
// 3: more than 8 hrs of total work per day, -1 pt per slot after the 8 hr mark
// score from 0-100
app.get("/getHealthiness", (req, res) => {

    const inputData = req.query.userData;
    
    const outputData = {
        SCORE: 100,
        PROBLEMS: []
    }

    const sortFunc = (a, b) => {
        if (a[0] == b[0]) {
            return 0;
        } 
        return (a[0] < b[0] ? -1 : 1);
    }
    
    if (req.query.userData.SCHEDULEDTIME == undefined) {
        res.status(200).send(outputData);
    } else {
        
        // more than 8 hours total work per day
        // more than 2 hours of work deductions
        for (const key in inputData.SCHEDULEDTIME) {
            const sortedTimeSlots = inputData.SCHEDULEDTIME[key].sort(sortFunc);
            let scheduledDayArray = new Array(96).fill(0);
            console.log(key);
            for (let i = 0; i < sortedTimeSlots.length; i++) {                
                let taskID = sortedTimeSlots[i][2];
                let dueDate = inputData.TASKS[taskID]?.DUEDATE;
                let taskName = inputData.TASKS[taskID]?.NAME;
                let countSlots = 0;

                console.log(sortedTimeSlots[i]);
                let start = parseInt(sortedTimeSlots[i][0]);
                let end = parseInt(sortedTimeSlots[i][1]);

                if (taskID != 3 || dueDate != undefined) {
                    let date1 = new Date(key);
                    let date2 = new Date(dueDate);
        
                    for (let y = start; y <= end; y++) {
                        scheduledDayArray[y] = 1;
                        countSlots += 1;
                    }

                    if (dueDate <= key) {
                        let differenceInDays = (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24);
                        console.log(differenceInDays);
                        let numberOfPointsLost = 1 * (differenceInDays + 1) * countSlots;
                        outputData.SCORE -= numberOfPointsLost;
                        outputData.PROBLEMS.push(["You have " + taskName + " scheduled on or after its due date of " + dueDate, -numberOfPointsLost]);
                    }
                }
                

            }
            console.log(scheduledDayArray);
            let counter = 0;
            let totalOver8 = 0;
            let totalSlots = 0;
            let isMoreThan8 = false;
            for (let i = 0; i < 96; i++) {
                if (scheduledDayArray[i] == 1) {
                    counter += 1;
                    totalSlots += 1;
                } else {
                    counter = 0;
                }

                if (counter > 8) {
                    isMoreThan8 = true;
                    totalOver8 += 1; 
                }
            }
            if (isMoreThan8) {
                outputData.SCORE -= totalOver8;
                outputData.PROBLEMS.push(["You are working too much in one sitting (>2 hours) on " + key, -totalOver8]);
            }
            if (totalSlots > 32) {
                let timeOver8Hrs = totalSlots - 32;
                outputData.SCORE -= timeOver8Hrs;
                outputData.PROBLEMS.push(["You have too much work (> 8 hours) on " + key, -timeOver8Hrs]);
            }
        }

        // work on or after due date deductions
        if (outputData.SCORE < 0) {
            outputData.SCORE = 0;
        }
        console.log("outputting " + JSON.stringify(outputData));
        res.status(200).send(outputData);
    }
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
