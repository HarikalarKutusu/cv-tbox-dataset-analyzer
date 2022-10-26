// MUI
import PollIcon from "@mui/icons-material/Poll";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CopyrightIcon from "@mui/icons-material/Copyright";

// App
import {
  appVersion,
  appDataDate,
  appCommonVoiceURL,
  appGithubURL,
  appLicenseURL,
} from "../../helpers/appHelper";

import "./appInfo.css"

export const AppInfo = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          // textAlign: "center",
          verticalAlign: "bottom",
          position: "absolute",
          bottom: 40,
          fontSize: "8px",
          color: "#999",
        }}
      >
        <div>
          <div className="appinfo-vcenter">
            <PollIcon />
            {appVersion}<br />
            {appDataDate}
          </div>
          <br />
          <div className="appinfo-vcenter">
            <a
              href={appCommonVoiceURL}
              target="_blank"
              rel="noreferrer"
              className="appinfo-vcenter appinfo-link"
            >
              <img src="/icons/mars.svg" width="24px" alt="Common Voice" />
            </a>
            <a
              href={appGithubURL}
              target="_blank"
              rel="noreferrer"
              className="appinfo-vcenter appinfo-link"
            >
              <GitHubIcon />
            </a>
            <a
              href={appLicenseURL}
              target="_blank"
              rel="noreferrer"
              className="appinfo-vcenter appinfo-link"
            >
              <CopyrightIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
