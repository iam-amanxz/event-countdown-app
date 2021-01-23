import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Firebase, { FirebaseContext } from "./Firebase";
import { EventProvider } from "./contexts/EventContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "./index.css";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <EventProvider>
      <App />
    </EventProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
