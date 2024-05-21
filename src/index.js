import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./components/Approuter";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router>
            <AppRouter />
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
