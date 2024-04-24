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
    apiBaseAddress: `https://unitedtech-linemx.qa.dtj.aws.ual.com/linemx/${lineMxVersion}`,
    webTechApiBaseUrl: "https://logbook.qa.dsq.aws.ual.com",
    REACT_APP_ENVIRONMENT: "localhost",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188fba97-4473-48b6-8126-c0359e0b71a9",
    REACT_APP_URL_AMT_BASE: "https://techops-oqa.ual.com/TisPortal",
    REACT_APP_AWS_URL: "https://dwz-995298.auth.us-east-2.amazoncognito.com",
    REACT_APP_AWS_CLIENT_ID: "77l029pgs0pnv3p3f5mch7735m",
    REACT_APP_REDIRECT_URI: "https://mx.dev.dwz.aws.ual.com/esfr",
    REACT_APP_LOGOUT_URL:
      "https://dwz-995298.auth.us-east-2.amazoncognito.com/logout?client_id=77l029pgs0pnv3p3f5mch7735m&logout_uri=https://signon-oqa.ual.com/oam/server/logout?end_url=https://signon-oqa.ual.com/oamsso/global/logout.html",
  },
  development: {
    ...defaultConfig,
    apiBaseAddress: `https://unitedtech-linemx.qa.dtj.aws.ual.com/linemx/${lineMxVersion}`,
    webTechApiBaseUrl: "https://logbook.qa.dsq.aws.ual.com",
    REACT_APP_ENVIRONMENT: "development",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188fba97-4473-48b6-8126-c0359e0b71a9",
    REACT_APP_URL_AMT_BASE: "https://techops-oqa.ual.com/TisPortal",
    REACT_APP_AWS_URL: "https://dwz-995298.auth.us-east-2.amazoncognito.com",
    REACT_APP_AWS_CLIENT_ID: "77l029pgs0pnv3p3f5mch7735m",
    REACT_APP_REDIRECT_URI: "https://mx.dev.dwz.aws.ual.com/esfr",
    REACT_APP_LOGOUT_URL:
      "https://dwz-995298.auth.us-east-2.amazoncognito.com/logout?client_id=77l029pgs0pnv3p3f5mch7735m&logout_uri=https://signon-oqa.ual.com/oam/server/logout?end_url=https://signon-oqa.ual.com/oamsso/global/logout.html",
  },
  qa: {
    ...defaultConfig,
    apiBaseAddress: `https://unitedtech-linemx.qa.dtj.aws.ual.com/linemx/${lineMxVersion}`,
    webTechApiBaseUrl: "https://logbook.qa.dsq.aws.ual.com",
    REACT_APP_ENVIRONMENT: "qa",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188fba97-4473-48b6-8126-c0359e0b71a9",
    REACT_APP_URL_AMT_BASE: "https://techops-oqa.ual.com/TisPortal",
    REACT_APP_AWS_URL: "https://dwz-635169.auth.us-east-2.amazoncognito.com",
    REACT_APP_AWS_CLIENT_ID: "57bimq4fo6akrk9nr4te7bdehu",
    REACT_APP_REDIRECT_URI: "https://mx.qa.dwz.aws.ual.com/esfr",
    REACT_APP_LOGOUT_URL:
      "https://dwz-635169.auth.us-east-2.amazoncognito.com/logout?client_id=57bimq4fo6akrk9nr4te7bdehu&logout_uri=https://signon-oqa.ual.com/oam/server/logout?end_url=https://signon-oqa.ual.com/oamsso/global/logout.html",
  },
  stage: {
    ...defaultConfig,
    apiBaseAddress: `https://unitedtech-linemx.stg.dtj.aws.ual.com/linemx/${lineMxVersion}`,
    webTechApiBaseUrl: "https://logbook-stg.ual.com",
    REACT_APP_ENVIRONMENT: "staging",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188FBA97-4473-48B6-8126-C0359E0B71A9",
    REACT_APP_URL_AMT_BASE: "https://techops.ual.com/TisPortal",
    REACT_APP_AWS_URL: "https://dwz-739743.auth.us-east-2.amazoncognito.com",
    REACT_APP_AWS_CLIENT_ID: "mgo6d2bdcvhei02gl6jobl5mu",
    REACT_APP_REDIRECT_URI: "https://mx-stg.ual.com/esfr",
    REACT_APP_LOGOUT_URL:
      "https://dwz-739743.auth.us-east-2.amazoncognito.com/logout?client_id=mgo6d2bdcvhei02gl6jobl5mu&logout_uri=https://signon.ual.com/oam/server/logout?end_url=https://signon.ual.com/oamsso/global/logout.html",
  },
  stagedr: {
    ...defaultConfig,
    REACT_APP_ENVIRONMENT: "staging",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "188FBA97-4473-48B6-8126-C0359E0B71A9",
    REACT_APP_URL_AMT_BASE: "https://techops.ual.com/TisPortal",
    REACT_APP_AWS_URL: "https://dwz-739743.auth.us-east-1.amazoncognito.com",
    REACT_APP_AWS_CLIENT_ID: "1qe1vgkv349jqa1gqjhbob9vim",
    REACT_APP_REDIRECT_URI: "https://mx-stg.ual.com/esfr",
    REACT_APP_LOGOUT_URL:
      "https://dwz-739743.auth.us-east-1.amazoncognito.com/logout?client_id=1qe1vgkv349jqa1gqjhbob9vim&logout_uri=https://signon.ual.com/oam/server/logout?end_url=https://signon.ual.com/oamsso/global/logout.html",
  },
  production: {
    ...defaultConfig,
    REACT_APP_ENVIRONMENT: "production",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "1807c0b6-17a3-4730-8b5c-61a0fee8f754",
    REACT_APP_URL_AMT_BASE: "https://techops.ual.com/TisPortal",
    REACT_APP_AWS_URL: "https://dwz-810431.auth.us-east-2.amazoncognito.com",
    REACT_APP_AWS_CLIENT_ID: "70ule75qskqei9k0od1464ag3i",
    REACT_APP_REDIRECT_URI: "https://mx.ual.com/esfr",
    REACT_APP_LOGOUT_URL:
      "https://dwz-810431.auth.us-east-2.amazoncognito.com/logout?client_id=70ule75qskqei9k0od1464ag3i&logout_uri=https://signon.ual.com/oam/server/logout?end_url=https://signon.ual.com/oamsso/global/logout.html",
  },
  productiondr: {
    ...defaultConfig,
    REACT_APP_ENVIRONMENT: "production",
    PUBLIC_URL: "/esfr/",
    REACT_APP_APPLICATION_NAME: "MobileTech",
    REACT_APP_APPLICATION_KEY: "1807c0b6-17a3-4730-8b5c-61a0fee8f754",
    REACT_APP_URL_AMT_BASE: "https://techops.ual.com/TisPortal",
    REACT_APP_AWS_URL: "https://dwz-810431.auth.us-east-2.amazoncognito.com",
    REACT_APP_AWS_CLIENT_ID: "73ntlelgdvvsb8746blgb1f3ug",
    REACT_APP_REDIRECT_URI: "https://mx.ual.com/esfr",
    REACT_APP_LOGOUT_URL:
      "https://dwz-810431.auth.us-east-1.amazoncognito.com/logout?client_id=73ntlelgdvvsb8746blgb1f3ug&logout_uri=https://signon.ual.com/oam/server/logout?end_url=https://signon.ual.com/oamsso/global/logout.html",
  },
}[env];

export default config;
