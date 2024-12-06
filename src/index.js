import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./important/Global";
import { BrowserRouter as Router } from "react-router-dom";

import { ConfirmProvider } from "material-ui-confirm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
