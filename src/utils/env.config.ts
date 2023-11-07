import defaultConfig from "./default.config";

const env = process.env.REACT_APP_ENVIRONMENT || "development";

const config: any = {
    development: {
        ...defaultConfig,
        apiBaseAddress: "https://unitedtech-linemx.qa.dtj.aws.ual.com/linemx/v60",
        URL_GET_PROFILE: "/api/employee/getprofile",
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
}[env];

export default config;