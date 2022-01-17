import React, { Component } from "react";
import { Route } from "react-router-dom";

import AppLayout from "../../container/AppLayout";
import { routers } from "../../router/routers";
import MainPage from "../MainPage";

export default class Dashboard extends Component {
  renderRouter = (router) => {
    if (router.children) {
      return router.children.map((element) => this.renderRouter(element));
    } else {
      return (
        <Route
          path={router.path}
          component={router.component}
          key={router.path}
        />
      );
    }
  };

  render() {
    return (
      <AppLayout>
        <Route path="/" exact component={MainPage} />
        {routers.map((router) => this.renderRouter(router))}
      </AppLayout>
    );
  }
}
