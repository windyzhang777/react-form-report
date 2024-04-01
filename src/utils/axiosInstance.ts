import axios from "axios";
import config from "src/utils/env.config";

// create a instance of the axios and use this within the app for api calls
const axiosInstance = axios.create({
  baseURL: `{config.apiBaseAddress}`,
  headers: {
    ApplicationName: config.REACT_APP_APPLICATION_NAME,
    ApplicationKey: config.REACT_APP_APPLICATION_KEY,
    UserName: sessionStorage.getItem("id") ? sessionStorage.getItem("id") : "",
    Platform: "Web",
  },
});

export default axiosInstance;
