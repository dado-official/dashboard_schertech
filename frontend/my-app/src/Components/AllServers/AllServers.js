import React, { useEffect, useState } from "react";
import ServerContainer from "../AllServers/ServerContainer";
import AddButton from "../Shared/AddButton";
import axios from "axios";

export default function AllServers({ setUrl }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setUrl("Server");
        axios.get("http://localhost:4000/api/server").then((res) => {
            setData(res.data);
        });
    }, []);

    const getData = async () => {
        return Promise.all();
    };

    return (
        <div className="main">
            <h2 className={`text-white text-2xl font-medium`}>Servers</h2>
            <p className=" text-unclicked">All the current servers</p>
            <div className="grid grid-flow-row gap-8 mt-4 responsiveGrid">
                {data.map((element) => (
                    <ServerContainer
                        name={element.hostname}
                        description={element.description}
                    />
                ))}
                <AddButton title="server" />
            </div>
        </div>
    );
}
