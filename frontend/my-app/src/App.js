import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import AllServers from "./Components/AllServers/AllServers";
import AllRepositories from "./Components/AllRepositories/AllRepositories.";
import Repository from "./Components/Repository/Repository";
import AddServer from "./Components/AllServers/AddServer";
import AddRepository from "./Components/AllRepositories/AddRepository";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllCustom from "./Components/Custom/AllCustom";

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
                <Route path={"/repository/add"}>
                    <AddRepository />
                </Route>
                <Route path="/repository/:id">
                    <Repository setUrl={setUrl} />
                </Route>
                <Route path={"/server/add"}>
                    <AddServer />
                </Route>
                <Route path="/custom" exact>
                    <AllCustom setUrl={setUrl} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
