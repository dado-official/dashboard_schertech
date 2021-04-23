import React, { useState } from "react";
import SidebarElement from "./Sidebarelement";

import { HiServer } from "react-icons/hi";
import { IoLogoBitbucket } from "react-icons/all";
import { BiCustomize } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";

const Sidebar = ({ url, setOpenSidebar, openSidebar }) => {
    return (
        <header
            id="sidebarMainContainer"
            className={`bg-primary z-50 fixed top-0 lg:top-auto left-0 lg:left-auto lg:rounded-0.938 h-full lg:h-maxHeight w-full lg:w-14.625 pr-1.188 pl-1.188 pt-1.688 ${
                openSidebar ? "block slidein" : "slideout"
            } lg:block`}
        >
            <div
                className="flex justify-end py-1 cursor-pointer lg:hidden mb-2"
                onClick={() => setOpenSidebar(false)}
            >
                <RiCloseFill size="30" color="white" />
            </div>
            <SidebarElement
                icon={HiServer}
                title="Server"
                url={url}
                alert={0}
                setOpenSidebar={setOpenSidebar}
            />
            <SidebarElement
                icon={IoLogoBitbucket}
                title="Repository"
                url={url}
                alert={0}
                setOpenSidebar={setOpenSidebar}
            />
            <SidebarElement
                icon={BiCustomize}
                title="Custom"
                url={url}
                alert={0}
                setOpenSidebar={setOpenSidebar}
            />
        </header>
    );
};

export default Sidebar;
