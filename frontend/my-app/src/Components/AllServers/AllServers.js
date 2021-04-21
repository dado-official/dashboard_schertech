import React, { useEffect, useState } from "react";
import ServerContainer from "../AllServers/ServerContainer";
import AddButton from "../Shared/AddButton";
import axios from "axios";

export default function AllServers({ setUrl }) {
    const [data, setData] = useState([]);
    const [del, setDel] = useState(false);

    useEffect(() => {
        setUrl("Server");
        axios.get("http://localhost:4000/api/server").then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, [del]);

    const getData = async () => {
        return Promise.all();
    };

    return (
        <div className="main">
            <h2 className={`text-white text-2xl font-medium`}>Servers</h2>
            <p className=" text-unclicked">All the current servers</p>
            <div className="grid grid-flow-row gap-8 mt-4 responsiveGrid">
                {data.length > 0
                    ? data.map((element) => (
                          <ServerContainer
                              name={element.hostname}
                              setDel={setDel}
                              description={element.description}
                          />
                      ))
                    : null}
                <AddButton title="server" />
            </div>
        </div>
    );
}
