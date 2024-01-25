import defaultConfig from "./default.config";
import {AppConfig, EnvironmentConfig} from "../commons/types";

const env = process.env.REACT_APP_ENVIRONMENT || "development";

// line mx broker version
const lineMxVersion = "v63";

const config: EnvironmentConfig = {
    development: {
        ...defaultConfig,
        apiBaseAddress: `https://unitedtech-linemx.qa.dtj.aws.ual.com/linemx/${lineMxVersion}`,
        webTechApiBaseUrl: "https://logbook.qa.dsq.aws.ual.com",

    },
    qa: {
        ...defaultConfig,
        apiBaseAddress: `https://unitedtech-linemx.qa.dtj.aws.ual.com/linemx/${lineMxVersion}`,
        webTechApiBaseUrl: "https://logbook.qa.dsq.aws.ual.com",
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