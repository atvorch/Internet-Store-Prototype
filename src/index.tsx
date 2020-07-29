import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { initStore } from "./modules";
import { Provider } from "react-redux";

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
