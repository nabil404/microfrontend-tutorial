import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const mount = (el) => {
  ReactDOM.render(<App />, el);
};

//Standalone
if (process.env.NODE_ENV === "development") {
  const root = document.querySelector("#__marketing-root__");
  if (root) mount(root);
}

//With Container
export { mount };
