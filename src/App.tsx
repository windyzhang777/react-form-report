import CommonLoader from "./commons/CommonLoader";
import {useState} from "react";
import Header from "./components/Header";

const App = () => {
    const [loading] = useState<boolean>(false);

    return (
        <div className="app">
            {loading ? <CommonLoader></CommonLoader> :
                <Header />
            }
        </div>
    );
}

export default App;
