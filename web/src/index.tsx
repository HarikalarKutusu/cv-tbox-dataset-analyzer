import React from "react";
import ReactDOM from "react-dom/client";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
import "./index.css";
import App from "./App";

// see: https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v6
// This implements the default behavior from styled-components v5
function shouldForwardProp(propName: string, target: any) {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <App />
    </StyleSheetManager>
  </React.StrictMode>,
);
