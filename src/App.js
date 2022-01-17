import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { Dashboard } from "./router";
import AlertModal from "./components/AlertModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "react-notifications/lib/notifications.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
      <AlertModal />
      <NotificationContainer />
    </>
  );
}

export default App;
