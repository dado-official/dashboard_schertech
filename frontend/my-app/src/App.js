import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import AllServers from "./Components/AllServers/AllServers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route path={["/server", "/"]} exact>
                    <AllServers />
                </Route>
                <Route path="/repository" exact>
                    <p>repo</p>
                </Route>
                <Route path="/scrum" exact>
                    <p>g</p>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
