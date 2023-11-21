import axios from "axios";

// create a instance of the axios and use this within the app for api calls
const axiosInstance = axios.create({
    baseURL : `{config.apiBaseAddress}`,
    headers: {
        "ApplicationName": process.env.REACT_APP_APPLICATION_NAME,
        "ApplicationKey": process.env.REACT_APP_APPLICATION_KEY,
        "UserName": sessionStorage.getItem("id") ? sessionStorage.getItem("id") : "",
        "Platform": "Web"
    },
});

export default axiosInstance;