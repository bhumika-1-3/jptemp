import React from "react";
import ReactDOM from "react-dom/client";

// tailwindCSS styles import
import "./assets/styles/index.css";
import "./fonts/RoxieRossa/Roxierossa.ttf";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter as Router } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "./constants";



const appID = COMETCHAT_CONSTANTS.APP_ID;
const region = COMETCHAT_CONSTANTS.REGION;

const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

const root = ReactDOM.createRoot(document.getElementById("root"));

CometChat.init(appID, appSetting).then(
    () => {
        if (CometChat.setSource) {
            CometChat.setSource("ui-kit", "web", "reactjs");
        }
        console.log("Initialization completed successfully");
        root.render(
            <App />,
            document.getElementById("root")
        );
    },
    (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
    }
);
