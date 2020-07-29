import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";

import { initStore } from "./modules";
import { Provider } from "react-redux";

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById("root")
);
