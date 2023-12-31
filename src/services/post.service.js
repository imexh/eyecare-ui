import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/user";

const getHelpText = () => {
    return axios.get(API_URL + "/help/view", { headers: authHeader() });
};

const getContacts = () => {
    return axios.get(API_URL + "/contactus/view", { headers: authHeader() });
};

const getAboutText = () => {
    return axios.get(API_URL + "/about/view", { headers: authHeader() });
};

const getContactDetails = () => {
    return axios.get(API_URL + "/contactus/view", { headers: authHeader() });
};

const getUserDetails = (username) => {
    return axios.get(API_URL + "/userdetails", { params: { username }, headers: authHeader() });
};

const addAccountDetails = (username, name, birthday, contactNo, email) => {
    return axios.post(API_URL + "/addAccountDetails",
        { username, name, birthday, contactNo, email },
        { headers: authHeader() }
    );
};

const addDistanceCalculations = (username, date, averageDistance) => {
    return axios.post(API_URL + "/addDistance",
        { username, date, averageDistance },
        { headers: authHeader() }
    );
};

const addInteractionTimeCalculations = (username, date, interactionTime) => {
    return axios.post(API_URL + "/addInteractionTime",
        { username, date, interactionTime },
        { headers: authHeader() }
    );
};

const postService = {
    getHelpText,
    getContacts,
    getAboutText,
    getContactDetails,
    getUserDetails,
    addAccountDetails,
    addDistanceCalculations,
    addInteractionTimeCalculations
};

export default postService;