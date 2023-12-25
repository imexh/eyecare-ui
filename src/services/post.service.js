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

const postService = {
    getHelpText,
    getContacts,
    getAboutText,
    getContactDetails,
    getUserDetails,
    addAccountDetails
};

export default postService;