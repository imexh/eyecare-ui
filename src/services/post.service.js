import axios from "axios";
import authHeader from "./auth.header";
import URL from '../config';

const API_URL = URL + "/api/user";

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

const getWeeklyDistances = (username) => {
    return axios.get(API_URL + "/weekly/distances", { params: { username }, headers: authHeader() });
};

const getWeeklyInteractionTimes = (username) => {
    return axios.get(API_URL + "/weekly/interactionTimes", { params: { username }, headers: authHeader() });
};

const getMonthlyDistances = (username) => {
    return axios.get(API_URL + "/monthly/distances", { params: { username }, headers: authHeader() });
};

const getMonthlyInteractionTimes = (username) => {
    return axios.get(API_URL + "/monthly/interactionTimes", { params: { username }, headers: authHeader() });
};

const getPreviousWeeklyDistances = (username) => {
    return axios.get(API_URL + "/previous/weekly/distances", { params: { username }, headers: authHeader() });
};

const getPreviousWeeklyInteractionTimes = (username) => {
    return axios.get(API_URL + "/previous/weekly/interactionTimes", { params: { username }, headers: authHeader() });
};

const getHealthTips = (username) => {
    return axios.get(API_URL + "/tips", { params: { username }, headers: authHeader() });
};

const calculateCvsPercentage = (age, gender, averageHours, eyeDisease, contactLenses, monitorFilters, eyeSurgeries, averageDistance,
    roomIllumination, screenBrightness, breaks, headache, burningEyeSensation, eyeRedness, blurredVision, dryEyes,
    neckAndShoulderPain, eyeStrain, tiredEyes, soreEyes, irritation, poorFocusing, doubleVision) => {
    return axios.post(API_URL + "/calculate-cvs",
        {
            age, gender, averageHours, eyeDisease, contactLenses, monitorFilters, eyeSurgeries, averageDistance,
            roomIllumination, screenBrightness, breaks, headache, burningEyeSensation, eyeRedness, blurredVision, dryEyes,
            neckAndShoulderPain, eyeStrain, tiredEyes, soreEyes, irritation, poorFocusing, doubleVision
        },
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
    addInteractionTimeCalculations,
    getWeeklyDistances,
    getWeeklyInteractionTimes,
    getMonthlyDistances,
    getMonthlyInteractionTimes,
    getPreviousWeeklyDistances,
    getPreviousWeeklyInteractionTimes,
    getHealthTips,
    calculateCvsPercentage
};

export default postService;