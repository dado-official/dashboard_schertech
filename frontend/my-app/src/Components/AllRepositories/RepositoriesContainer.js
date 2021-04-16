import React, { useState } from "react";
import Commit from "./Commit";

export default function ServerContainer({ name, description }) {
    const [hover, setHover] = useState(false);
    return (
        <div
            className="bg-primary hover:bg-backgroundHover tranition ease-in-out cursor-pointer duration-500 rounded-0.938 py-3 px-4 w-full"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex justify-between">
                <h6 className="text-white ">{name}</h6>
                <h6 className="text-unclicked">
                    Lines: <span className="text-onlineGreen">500k</span>
                </h6>
            </div>
            <p className="text-unclicked text-sm mt-2">{description}</p>
            <div className="flex mt-4 justify-between">
                <Commit />
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
