import React, { useState } from "react";
import Locaction from "./Location";

export default function ServerContainer({ name, description, online }) {
    const [hover, setHover] = useState(false);
    return (
        <div
            className={`bg-primary hover:bg-backgroundHover tranition ease-in-out cursor-pointer duration-500 rounded-0.938 py-3 px-4 w-full border-2 ${
                online ? "border-onlineGreen" : "border-offlineRed"
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex justify-between">
                <h6 className="text-white ">{name}</h6>
                <div className="flex gap-2 items-center">
                    <h6 className="text-unclicked">
                        {online ? "Online" : "Offline"}
                    </h6>
                    <div
                        className={`rounded-full h-2 w-2 bg-onlineGreen ${
                            online ? "bg-onlineGreen" : "bg-offlineRed"
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
