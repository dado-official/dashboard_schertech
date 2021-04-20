import React, { useEffect } from "react";
import ServerContainer from "../AllServers/ServerContainer";
import AddButton from "../Shared/AddButton";

export default function AllServers({ setUrl }) {
    useEffect(() => {
        setUrl("Server");
    }, []);
    return (
        <div className="main">
            <h2 className={`text-white text-2xl font-medium`}>Servers</h2>
            <p className=" text-unclicked">All the current servers</p>
            <div className="grid grid-flow-row gap-8 mt-4 responsiveGrid">
                <ServerContainer
                    name="Server1"
                    description="Server1 description..."
                />
                <ServerContainer
                    name="Server1"
                    description="Server1 description..."
                />
                <ServerContainer
                    name="Server1"
                    description="Server1 description..."
                    online={true}
                />
                <ServerContainer
                    name="Server1"
                    description="Server1 description..."
                />
                <ServerContainer
                    name="Server1"
                    description="Server1 description..."
                    online={true}
                />
                <ServerContainer
                    name="Server1"
                    description="Server1 description..."
                />
                <ServerContainer
                    name="Server1"
                    description="Server1 description..."
                />
                <AddButton title="server" />
            </div>
        </div>
    );
}
