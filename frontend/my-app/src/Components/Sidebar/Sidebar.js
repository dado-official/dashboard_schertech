import React, { useState } from "react";
import SidebarElement from "./Sidebarelement";
import ServerContainer from "../AllServers/ServerContainer";
//import Rerpository from "../TabRepositories/repositories"
//import Scrum from "../TabScrum/scrum"

import { HiServer } from "react-icons/hi";
import { IoLogoBitbucket } from "react-icons/all";
import { BiCalendarEvent } from "react-icons/bi";

const Sidebar = ({ url }) => {
    return (
        <header
            id="sidebarMainContainer"
            className="bg-primary fixed rounded-0.938 h-maxHeight w-14.625 pr-1.188 pl-1.188 pt-1.688 "
        >
            <SidebarElement icon={HiServer} title="Server" url={url} />
            <SidebarElement
                icon={IoLogoBitbucket}
                title="Repository"
                url={url}
            />
            <SidebarElement icon={BiCalendarEvent} title="Scrum" url={url} />
        </header>
    );
};

export default Sidebar;
