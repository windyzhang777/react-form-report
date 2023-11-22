import React from "react";
import CommonLoader from "./commons/CommonLoader";
import { useEffect } from "react";
import Header from "./components/header/Header";
import HomeScreen from "./components/homescreen/homescreen";
import {getProfile} from "./redux/ducks/getProfile";
import {useAppDispatch, useAppSelector} from "./redux/hooks";

const App = () => {
    const {loading} = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    let empId: string;

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
