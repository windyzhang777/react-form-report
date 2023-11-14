import defaultConfig from "./default.config";
import {AppConfig, EnvironmentConfig} from "../commons/types";

const env = process.env.REACT_APP_ENVIRONMENT || "development";

const config: EnvironmentConfig = {
    development: {
        ...defaultConfig,
        apiBaseAddress: "https://unitedtech-linemx.qa.dtj.aws.ual.com/linemx/v61",
        URL_GET_PROFILE: "/api/employee/getprofile",
        URL_GET_ALL_SDRS: "/api/Elb/GetAllSdrs"
    },
    qa: {
        ...defaultConfig,

    },
    stage:{

    },
    stagedr:{

    },
    production:{

    }, 
    productiondr:{

    }
}[env as keyof AppConfig];

export default config;