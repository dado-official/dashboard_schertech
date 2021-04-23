import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import AllServers from "./Components/AllServers/AllServers";
import AllRepositories from "./Components/AllRepositories/AllRepositories.";
import Repository from "./Components/Repository/Repository";
import AddServer from "./Components/AllServers/AddServer";
import AddRepository from "./Components/AllRepositories/AddRepository";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllCustom from "./Components/AllCustoms/AllCustom";
import Custom from "./Components/Custom/Custom";
import AddCustom from "./Components/AllCustoms/AddCustom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    const [url, setUrl] = useState();
    const [openSidebar, setOpenSidebar] = useState(false);
    const [name, setName] = useState();
    const [workspace, setWorkspace] = useState();
    const [reposlug, setReposlug] = useState();
    return (
        <Router>
            <Sidebar
                url={url}
                setUrl={setUrl}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
            />
            <Navbar setOpenSidebar={setOpenSidebar} />
            <Switch>
                <Route path={["/server", "/"]} exact>
                    <AllServers setUrl={setUrl} />
                </Route>
                <Route path="/repository" exact>
                    <AllRepositories setUrl={setUrl} />
                </Route>
                <Route path={"/repository/add"}>
                    <AddRepository 
                        setName={setName}
                        setWorkspace={setWorkspace}
                        setReposlug={setReposlug}
                    />
                </Route>
                <Route path="/repository/:id">
                    <Repository 
                        setUrl={setUrl}
                        name={name}
                        workspace={workspace}
                        reposlug={reposlug}
                     />
                </Route>
                <Route path={"/server/add"}>
                    <AddServer />
                </Route>
                <Route path={"/custom/add"}>
                    <AddCustom />
                </Route>
                <Route path="/custom" exact>
                    <AllCustom setUrl={setUrl} />
                </Route>
                <Route path="/custom/:id" exact>
                    <Custom setUrl={setUrl} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
