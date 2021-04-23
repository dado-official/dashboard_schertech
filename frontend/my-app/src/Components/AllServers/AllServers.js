import React, { useEffect, useState, useRef } from "react";
import ServerContainer from "../AllServers/ServerContainer";
import axios from "axios";
import AddServer from "./AddServer";
import { FaAngleDown } from "react-icons/fa";

export default function AllServers({ setUrl }) {
    const [data, setData] = useState([]);
    const [del, setDel] = useState(false);
    const [isPopover, setIsPopover] = useState(false);

    const addServerRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (
                addServerRef.current &&
                !addServerRef.current.contains(e.target)
            ) {
                setIsPopover(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

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
                    className="py-2 px-6 bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black"
                    ref={addServerRef}
                >
                    <div className=" flex items-center gap-2">
                        Add Server
                        <FaAngleDown color="black" size="18" />
                    </div>
                </button>
                <div
                    ref={addServerRef}
                    className={`bg-input rounded-0.938 w-26 p-12 z-10 absolute right-0 top-14 border-onlineGreen border-4 ${
                        isPopover ? "" : "hidden"
                    }`}
                >
                    <AddServer setIsPopover={setIsPopover} />
                </div>
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
            </div>
        </div>
    );
}
