import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import AllServers from "./Components/AllServers/AllServers";
import AllRepositories from "./Components/AllRepositories/AllRepositories.";
import Repository from "./Components/Repository/Repository";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    const [url, setUrl] = useState();
    return (
        <Router>
            <Sidebar url={url} setUrl={setUrl} />
            <Switch>
                <Route path={["/server", "/"]} exact>
                    <AllServers setUrl={setUrl} />
                </Route>
                <Route path="/repository" exact>
                    <AllRepositories setUrl={setUrl} />
                </Route>
                <Route path="/repository/:id">
                    <Repository />
                </Route>
                <Route path="/scrum" exact>
                    <p>g</p>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
