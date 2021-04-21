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
            className={`bg-primary hover:bg-backgroundHover tranition ease-in-out cursor-pointer duration-300 rounded-0.938 py-3 px-4 w-full border-2 ${
                props.remainingdays === 0
                    ? " border-offlineRed"
                    : " border-onlineGreen"
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex justify-between">
                <h6 className="text-white ">{props.name}</h6>
                <div className="flex justify-between items-center">
                    <h6 className="text-unclicked">
                        enter Data:{" "}
                        <span
                            className={`${
                                props.remainingdays !== 0
                                    ? "text-onlineGreen"
                                    : " text-offlineRed"
                            }`}
                        >
                            {props.remainingdays === 0
                                ? "today"
                                : "in " + props.remainingdays + " days"}
                        </span>
                    </h6>
                </div>
            </div>
            <p className="text-unclicked text-sm mt-2">{props.description}</p>

            <div className="flex mt-4 justify-between">
                <div className=" bg-hover rounded-0.938  flex items-center justify-center p-2">
                    <p
                        className={`${
                            props.chart >= 0
                                ? "text-onlineGreen"
                                : "text-offlineRed"
                        }`}
                    >
                        {props.chart >= 0 ? "+" : ""}
                        {props.chart}%
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
