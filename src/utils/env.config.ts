import { EnvTypes, EnvironmentConfig } from "src/commons/types";
import defaultConfig from "src/utils/default.config";

let env: EnvTypes = "qa";
switch (window.location.hostname) {
  case "localhost":
    env = "localhost";
    break;
  case "mx.dev.dwz.aws.ual.com":
    env = "development";
    break;
  case "mx.qa.dwz.aws.ual.com":
    env = "qa";
    break;
  case "mx-stg.ual.com":
    env = "stage";
    break;
  case "mx.ual.com":
    env = "production";
    break;
  default:
    env = "development";
    break;
}

const lineMxVersion = "v64";
const config: EnvironmentConfig = {
  localhost: {
    ...defaultConfig,
    apiBaseAddress: `https://unitedtech-linemx.dev.dtj.aws.ual.com/linemx/${lineMxVersion}`,
    webTechApiBaseUrl: "https://logbook.qa.dsq.aws.ual.com",
    REACT_APP_ENVIRONMENT: "localhost",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188fba97-4473-48b6-8126-c0359e0b71a9",
  },
  development: {
    ...defaultConfig,
    apiBaseAddress: `https://unitedtech-linemx.dev.dtj.aws.ual.com/linemx/${lineMxVersion}`,
    webTechApiBaseUrl: "https://logbook.qa.dsq.aws.ual.com",
    REACT_APP_ENVIRONMENT: "development",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188fba97-4473-48b6-8126-c0359e0b71a9",
  },
  qa: {
    ...defaultConfig,
    apiBaseAddress: `https://unitedtech-linemx.qa.dtj.aws.ual.com/linemx/${lineMxVersion}`,
    webTechApiBaseUrl: "https://logbook.qa.dsq.aws.ual.com",
    REACT_APP_ENVIRONMENT: "qa",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188fba97-4473-48b6-8126-c0359e0b71a9",
  },
  stage: {
    ...defaultConfig,
    REACT_APP_ENVIRONMENT: "staging",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188FBA97-4473-48B6-8126-C0359E0B71A9",
  },
  stagedr: {
    ...defaultConfig,
    REACT_APP_ENVIRONMENT: "staging",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188FBA97-4473-48B6-8126-C0359E0B71A9",
  },
  production: {
    ...defaultConfig,
    REACT_APP_ENVIRONMENT: "production",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "1807c0b6-17a3-4730-8b5c-61a0fee8f754",
  },
  productiondr: {
    ...defaultConfig,
    REACT_APP_ENVIRONMENT: "production",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "1807c0b6-17a3-4730-8b5c-61a0fee8f754",
  },
}[env];

export default config;
