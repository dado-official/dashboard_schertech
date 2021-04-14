import React from 'react';
import SidebarElement from "./Sidebarelement";

import {FiServer} from 'react-icons/fi'
import {IoLogoBitbucket} from 'react-icons/all'
import {BiCalendarEvent} from 'react-icons/bi'

const Sidebar = () => {
    return (
        <div id="sidebarMainContainer" className="bg-primary fixed rounded-0.938 h-maxHeight w-14.625 pr-1.188 pl-1.188 pt-1.688 ">
            <SidebarElement 
                icon = {<FiServer color="white" ></FiServer>}
                title="Server"/>
            <SidebarElement 
                icon = {<IoLogoBitbucket color="white" ></IoLogoBitbucket>}
                title="Repository"/>
            <SidebarElement 
                icon = {<BiCalendarEvent color="white" ></BiCalendarEvent>}
                title="Scrum"/>
        </div>
    );
};

export default Sidebar;