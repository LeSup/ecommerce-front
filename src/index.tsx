import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HistoryRouter } from "redux-first-history/rr6";
import Routes from "./Routes";
import store, { history } from "./store";
import "antd/dist/antd.css";
import "./style.css";
import AnotherStore from "./anotherStore";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AnotherStore>
        <HistoryRouter history={history}>
          <Routes />
        </HistoryRouter>
      </AnotherStore>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
