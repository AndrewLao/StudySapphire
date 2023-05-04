import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-2_SE5BMAiXo",
    ClientId: "5m1mqo49mlptkopfcgtmv5mk3"
}

export default new CognitoUserPool(poolData);