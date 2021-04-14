import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import AllServers from "./Components/AllServers/AllServers";

function App() {
    return (
        <div className="App h-full w-full p-8 bg-background">
            <Sidebar />
            <AllServers />
        </div>
    );
}

export default App;
