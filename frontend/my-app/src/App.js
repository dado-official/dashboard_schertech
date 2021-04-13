import Sidebar from "./Components/Sidebar/Sidebar";
import SidebarElement from "./Components/Sidebar/Sidebarelement";
import './App.css';

import IconServer from './assets/Server.svg'
import IconRepository from './assets/Repository.svg'
import IconScrum from './assets/Scrum.svg'

function App() {

  const IconServer = (props) =>(
    <svg src={IconServer} xmlns="http://www.w3.org/2000/svg" fill={props.fill} className={props.class}></svg>
  )
  
  const IconRepository = (props) =>(
    <svg src={IconRepository} xmlns="http://www.w3.org/2000/svg" fill={props.fill} className={props.class}></svg>
  )
  
  const IconScrum = (props) =>(
    <svg src={IconScrum} xmlns="http://www.w3.org/2000/svg" fill={props.fill} className={props.class}></svg>
  )

  return (
    <div className="App h-full w-full p-1.875 bg-background">
      <Sidebar>
        <SidebarElement 
          icon={IconServer} 
          name="Server"/>
        <SidebarElement 
          icon={IconRepository}
          name="Repository"/>
        <SidebarElement 
          icon={IconScrum}
          name="Scrum"/>
      </Sidebar>
    </div>
  );
}

export default App;
