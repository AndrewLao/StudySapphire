import UserPool from "./UserPool.jsx";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import axios from "axios";

// registration

export const signUp = async (username, password, email) => {
    let message = "";  

    let attributeList = [];

    // temporary
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL
    });

    attributeList.push(
        new CognitoUserAttribute({
            Name: "email",
            Value: email,
        })
    );

    return await new Promise ((resolve, reject) => {
        UserPool.signUp(username, password, attributeList, null, (err, data) => {
            if (err) {
                switch (err.name) {
                    case "InvalidPasswordException":
                        message = "Password does not fulfill requirements";
                        break;
                    case "InvalidParameterException":
                        message = "Please enter a valid email address";
                        break;
                    case "UsernameExistsException":
                        message = "Username already exists";
                        break;
                    default:
                        message = "how tf did you get here";
                        break;
                }

                reject(message);
            } else {
                message = "Success";

                resolve(data);
            }
        })
    })
}

export const login = async (username, password) => {
    const user = new CognitoUser( {
        Username: username,
        Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    });

    return await new Promise ( (resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess: ", data);
                resolve(data);
            },
            onFailure: (err) => {
                console.log("Error: ", err);
                reject(err);
            }
        })
    });
}

export const checkSession = async () => {
    return await new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser();

        if (user) {
            user.getSession((err, session) => {
                if (err){
                    reject();
                } else {
                    resolve(session);
                }
            })
        } else {
            reject();
        }
    });
}

export const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
        user.signOut();
    }
}