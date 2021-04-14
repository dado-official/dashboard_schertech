import React,{useState} from 'react';
import SidebarElement from "./Sidebarelement";



import {FiServer} from 'react-icons/fi'
import {IoLogoBitbucket} from 'react-icons/all'
import {BiCalendarEvent} from 'react-icons/bi'

const Sidebar = () => {
    const [url, setUrl] = useState()
    return (
        <div id="sidebarMainContainer" className="bg-primary fixed rounded-0.938 h-maxHeight w-14.625 pr-1.188 pl-1.188 pt-1.688 ">
            <SidebarElement 
                icon = {<FiServer color={`${url === "Server" ? "white" : "#94A3BC"}`} ></FiServer>}
                title="Server"
                url={url}
                setUrl={setUrl}/>
            <SidebarElement 
                icon = {<IoLogoBitbucket color={`${url === "Repository" ? "white" : "#94A3BC"}`} ></IoLogoBitbucket>}
                title="Repository"
                url={url}
                setUrl={setUrl}/>
            <SidebarElement 
                icon = {<BiCalendarEvent color={`${url === "Scrum" ? "white" : "#94A3BC"}`} ></BiCalendarEvent>}
                title="Scrum"
                url={url}
                setUrl={setUrl}/>
        </div>
    );
};

export default Sidebar;