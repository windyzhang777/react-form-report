import axios from "axios";
import config from "./env.config";

// create a instance of the axios and use this within the app for api calls
const axiosInstance = axios.create({
    baseURL : `{config.apiBaseAddress}`,
    headers: {
        "ApplicationName": process.env.REACT_APP_APPLICATION_NAME,
        "ApplicationKey": process.env.REACT_APP_APPLICATION_KEY
    },
});

// interceptor to add headers for all the api calls
axiosInstance.interceptors.request.use(
    config => {
        config.headers.ApplicationName = process.env.REACT_APP_APPLICATION_NAME;
        config.headers.ApplicationKey = process.env.REACT_APP_APPLICATION_KEY;
        config.headers.UserName = "";
        config.headers.Platform = "Web";
        return config;
    }
);

export default axiosInstance;