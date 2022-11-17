import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory() || createMemoryHistory();
  if (onNavigate) history.listen(onNavigate);
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) history.push(nextPathname);
    },
  };
};

//Standalone
if (process.env.NODE_ENV === "development") {
  const root = document.querySelector("#__marketing-root__");
  if (root) mount(root, { defaultHistory: createBrowserHistory });
}

//With Container
export { mount };
