import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <div className="App h-full w-full p-8 ">
            <App />
        </div>
    </React.StrictMode>,
    document.getElementById("root")
);
