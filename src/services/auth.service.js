import axios from "axios";
import URL from '../config';

const API_URL = URL + "/api/auth";

const login = (username, password) => {
    return axios
        .post(API_URL + "/login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const createAccount = (username, email, password, confirmPassword) => {
    const userType = "USER";
    return axios
        .post(API_URL + "/register", { username, email, password, confirmPassword, userType })
}

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    login,
    logout,
    getCurrentUser,
    createAccount
};

export default authService;