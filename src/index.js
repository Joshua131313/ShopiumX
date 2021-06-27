import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
