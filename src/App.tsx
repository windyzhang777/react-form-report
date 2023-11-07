import CommonLoader from "./commons/CommonLoader";
import {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import HomeScreen from "./components/homescreen/HomeScreen";
import axiosInstance from "./utils/axiosInstance";
import config from "./utils/env.config";

const App = () => {
    const [loading, setLoading] = useState<boolean>(false);
    let empId: string;

    const getProfile = (empID: string) => {
        setLoading(true);
        axiosInstance
            .post(`${config.apiBaseAddress}${config.URL_GET_PROFILE}`, { EmployeeId: empID })
            .then(res => {
                const userProfileInfo = res.data.Result.Employee;
                if (userProfileInfo.EmployeeId !== null) {
                    sessionStorage.setItem("id", userProfileInfo.EmployeeId);
                    sessionStorage.setItem("station", userProfileInfo.Station);
                    sessionStorage.setItem("fname", userProfileInfo.FirstName);
                    sessionStorage.setItem("lname", userProfileInfo.LastName);
                    sessionStorage.setItem("jobRole", userProfileInfo.JobRole);
                    sessionStorage.setItem("email", userProfileInfo.EmailAddress);
                }
            })
            .catch(error => sessionStorage.clear())
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (process.env.REACT_APP_ENVIRONMENT === "local") empId = "v122887";
        getProfile(empId || "v122887");
    }, []);

    return (
        <div className="app">
            {loading ? <CommonLoader></CommonLoader> :
                <div>
                    <Header />
                    <div><HomeScreen/></div>
                </div>
            }
        </div>
    );
}

export default App;
