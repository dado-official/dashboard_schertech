import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CustomContainer(props) {
    const [hover, setHover] = useState(false);

    function deleteHandler(e) {
        e.preventDefault();
        axios
            .delete(`http://localhost:4000/api/custom/${props.id}`)
            .then((res) => {
                console.log("delete");
                props.setDel((prev) => !prev);
            });
    }

    return (
        <Link
            to={`custom/${props.id}`}
            className={`bg-primary hover:bg-backgroundHover tranition ease-in-out cursor-pointer duration-300 rounded-0.938 py-3 px-4 w-full border-l-4 ${
                props.remainingdays === undefined ||
                props.remainingdays.includes("ago")
                    ? " border-onlineGreen"
                    : " border-offlineRed"
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex justify-between">
                <h6 className="text-white ">{props.name}</h6>
                <div className="flex justify-between items-center">
                    <h6
                        className={`text-unclicked text-sm ${
                            props.remainingdays === undefined ||
                            props.remainingdays === null
                                ? "hidden"
                                : ""
                        }`}
                    >
                        Time left:{" "}
                        <span
                            className={`${
                                props.remainingdays !== undefined &&
                                props.remainingdays !== null &&
                                !props.remainingdays.includes("ago")
                                    ? "text-offlineRed"
                                    : " text-onlineGreen"
                            }`}
                        >
                            {props.remainingdays}
                        </span>
                    </h6>
                </div>
            </div>
            <p className="text-unclicked text-sm mt-2">{props.description}</p>

            <div className="flex mt-4 justify-between">
                <div className=" bg-hover rounded-0.938 font-medium flex items-center justify-center py-2 px-4">
                    <p
                        className={`${
                            props.chart >= 0
                                ? "text-onlineGreen"
                                : "text-offlineRed"
                        }`}
                    >
                        {props.chart === null
                            ? "0"
                            : props.chart >= 0
                            ? "+ "
                            : ""}
                        {props.chart} %
                    </p>
                </div>
                <h6
                    className={`text-unclicked hover:text-white font-semi text-2xl transition eae-in-out duration-300 cursor-pointer ${
                        !hover ? " opacity-0" : ""
                    }`}
                    onClick={deleteHandler}
                >
                    x
                </h6>
            </div>
        </Link>
    );
}
