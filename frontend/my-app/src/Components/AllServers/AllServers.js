import React, { useEffect, useState } from "react";
import ServerContainer from "../AllServers/ServerContainer";
import AddButton from "../Shared/AddButton";
import axios from "axios";
import AddServer from "./AddServer";
import { FaAngleDown } from "react-icons/fa";

export default function AllServers({ setUrl }) {
    const [data, setData] = useState([]);
    const [del, setDel] = useState(false);
    const [isPopover, setIsPopover] = useState(false);

    useEffect(() => {
        setUrl("Server");
        axios.get("http://localhost:4000/api/server").then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, [del]);

    return (
        <div className="main">
            <div className="relative flex justify-between items-baseline">
                <div>
                    <h2 className={`text-white text-2xl font-medium`}>
                        Servers
                    </h2>
                    <p className=" text-unclicked">All the current servers</p>
                </div>
                <button
                    onClick={() => setIsPopover((prev) => !prev)}
                    className="py-2 px-6 bg-onlineGreen rounded-0.625 font-medium text-black"
                >
                    <div className="focus:outline-none flex items-center gap-2">
                        Add Server
                        <FaAngleDown color="black" size="18" />
                    </div>
                </button>
                <AddServer isPopover={isPopover} setIsPopover={setIsPopover} />
            </div>
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
                <ServerContainer
                    name={"Hallo"}
                    setDel={setDel}
                    description={"Moin i bins"}
                />
            </div>
        </div>
    );
}
