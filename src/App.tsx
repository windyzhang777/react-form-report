import CommonLoader from "./commons/CommonLoader";
import {useState} from "react";
import Header from "./components/Header/Header";
import HomeScreen from "./components/homescreen/HomeScreen";

const App = () => {
    const [loading] = useState<boolean>(false);

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
