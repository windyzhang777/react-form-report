import CommonLoader from "./commons/CommonLoader";
import {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import HomeScreen from "./components/homescreen/HomeScreen";
import {getProfile} from "./redux/ducks/getProfile";
import {useAppDispatch} from "./redux/hooks";

const App = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    let empId: string;

    // const checkLocalEnv = () => {
    //     if (process.env.REACT_APP_ENVIRONMENT === "local") empId = "v122887";
    //     dispatch(getProfile(empId || "v122887"));
    // };

    useEffect(() => {
        if (process.env.REACT_APP_ENVIRONMENT === "local") empId = "v122887";
        dispatch(getProfile(empId || "v122887"));
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
