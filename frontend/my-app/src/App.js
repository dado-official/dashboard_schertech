import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import AllServers from "./Components/AllServers/AllServers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
    return (
        <div className="App h-full w-full p-8 bg-background">
          
          <Router>   
          <Sidebar/>     
            <Switch>
              <Route path="/Server" exact>
                <AllServers />
              </Route>
              <Route path="/Repository" exact>
                <p>repo</p>
              </Route>
              <Route path="/Scrum" exact>
                <p>g</p>
              </Route>
            </Switch>
        </Router>
        </div>
    );
}

export default App;
