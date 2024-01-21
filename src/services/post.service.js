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

const getInteractionTimeLimit = (username) => {
    return axios.get(API_URL + "/interaction-time-limit", { params: { username }, headers: authHeader() });
};

const getDistanceRange = (username) => {
    return axios.get(API_URL + "/distance-range", { params: { username }, headers: authHeader() });
};

const saveInteractionTimeLimit = (username, interactionTimeLimit) => {
    return axios.post(API_URL + "/set-interaction-time-limit",
        { username, interactionTimeLimit },
        { headers: authHeader() }
    );
};

const saveDistanceRange = (username, minimumDistance, maximumDistance) => {
    return axios.post(API_URL + "/set-distance-range",
        { username, minimumDistance, maximumDistance },
        { headers: authHeader() }
    );
};

const saveDefaultDistanceRange = (username) => {
    return axios.post(API_URL + "/default/set-distance-range",
        { username },
        { headers: authHeader() }
    );
};

const saveDefaultInteractionTimeLimit = (username) => {
    return axios.post(API_URL + "/default/set-interaction-time-limit",
        { username },
        { headers: authHeader() }
    );
};

const getSoundStatus = (username) => {
    return axios.get(API_URL + "/sound-status", { params: { username }, headers: authHeader() });
};

const saveSoundStatus = (username, status) => {
    return axios.post(API_URL + "/set-sound-status",
        { username, status },
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
    calculateCvsPercentage,
    getInteractionTimeLimit,
    getDistanceRange,
    saveInteractionTimeLimit,
    saveDistanceRange,
    saveDefaultDistanceRange,
    saveDefaultInteractionTimeLimit,
    getSoundStatus,
    saveSoundStatus
};

export default postService;