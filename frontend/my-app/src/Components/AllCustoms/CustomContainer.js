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
            className={`bg-primary hover:bg-backgroundHover relative cursor-pointer rounded-0.938 flex flex-col justify-between p-4 w-full `}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                className={`bg-blue w-full h-1 absolute left-0 top-0 rounded-t-0.938 ${
                    props.remainingdays === undefined ||
                    props.remainingdays.includes("ago")
                        ? " bg-onlineGreen"
                        : " bg-offlineRed"
                }`}
            ></div>
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
                    ></h6>
                </div>
            </div>

            <p className="text-unclicked text-sm mt-2 h-5 overflow-auto">
                {props.description}
            </p>

            <div className="flex mt-4 justify-between">
                <div className="flex gap-4 text-sm">
                    <div
                        className={`bg-hover rounded-0.938 font-medium flex items-center justify-center py-2 px-4 ${
                            props.remainingdays === undefined ||
                            props.remainingdays === null
                                ? "hidden"
                                : ""
                        }`}
                    >
                        <p
                            className={`${
                                props.remainingdays !== undefined &&
                                props.remainingdays !== null &&
                                !props.remainingdays.includes("ago")
                                    ? "text-offlineRed"
                                    : " text-onlineGreen"
                            }`}
                        >
                            {props.remainingdays}
                        </p>
                    </div>
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
