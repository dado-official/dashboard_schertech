import React, { useState, useEffect } from "react";
import Locaction from "./Location";
import axios from "axios";

export default function ServerContainer({ name, description }) {
    const [hover, setHover] = useState(false);
    const [online, setOnline] = useState();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/server/${name}`).then((res) => {
            setOnline(res.data.reachable);
        });
    }, []);

    return (
        <div
            className={`bg-primary hover:bg-backgroundHover tranition ease-in-out cursor-pointer duration-300 w-full ${
                online === undefined
                    ? "gradient-border padding-3"
                    : online
                    ? "border-onlineGreen border-2 py-3 px-4 "
                    : "border-offlineRed border-2 py-3 px-4 "
            } rounded-0.938`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex justify-between">
                <h6 className="text-white">{name}</h6>
                <div className="flex gap-2 items-center">
                    <h6 className="text-unclicked">
                        {online === undefined
                            ? "Waiting"
                            : online
                            ? "Online"
                            : "Offline"}
                    </h6>
                    <div
                        className={`rounded-full h-2 w-2 ${
                            online === undefined
                                ? "bg-white"
                                : online
                                ? "bg-onlineGreen"
                                : "bg-offlineRed"
                        }`}
                    ></div>
                </div>
            </div>
            <p className="text-unclicked text-sm mt-2">{description}</p>
            <div className="flex mt-4 justify-between">
                <Locaction location="Brixen, Italy" />
                <h6
                    className={`text-unclicked hover:text-white font-semi text-2xl transition eae-in-out duration-300 cursor-pointer ${
                        !hover ? " opacity-0" : ""
                    }`}
                >
                    x
                </h6>
            </div>
        </div>
    );
}
