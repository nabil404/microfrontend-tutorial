import React, { lazy, Suspense } from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { useState } from "react";
import { useEffect } from "react";

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({ productionPrefix: "co" });

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) history.push("/dashboard");
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardApp />
              </Route>
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
};
