import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "semantic-ui-css/semantic.min.css";
import App from "./app/layout/App";
import { ScrollToTop } from "./app/layout/ScrollToTop";
import "./app/layout/styles.css";
import { configureStore } from "./app/store/configureStore";
import { loadEvents } from "./features/events/eventActions";
import reportWebVitals from "./reportWebVitals";

const store = configureStore();

store.dispatch(loadEvents());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
