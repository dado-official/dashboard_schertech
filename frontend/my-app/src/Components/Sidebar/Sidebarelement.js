import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebarelement(props) {
    const [color, setcolor] = useState("#94A3BC");
    const Icon = props.icon;
    return (
        <Link
            to={`/${props.title.toLowerCase()}`}
            onMouseEnter={() => setcolor("#81c784")}
            ü
            onMouseLeave={() => setcolor("#94A3BC")}
            onClick={() => {
                props.setOpenSidebar(false);
            }}
            className={` 
                mb-2 cursor-pointer 
                rounded-0.938 
                py-2
                px-6
                flex flex-row content-evenly items-center 
                bg-primary 
                ${
                    props.url === props.title
                        ? "text-black bg-onlineGreen font-medium"
                        : "text-unclicked hover:text-onlineGreen "
                }
            `}
        >
            <div className="w-full flex justify-between flex-row items-center ">
                <div className="flex flex-row items-center">
                    <Icon
                        color={`${props.url === props.title ? "black" : color}`}
                    ></Icon>
                    <p className="pl-3 align-middle">{props.title}</p>
                </div>
                <div
                    className={` ${
                        props.alert === 0 ? "hidden" : ""
                    } h-1.25 w-1.25 bg-offlineRed rounded-0.313 flex items-center justify-center`}
                >
                    <p className="text-sm text-black font-bold">
                        {props.alert}
                    </p>
                </div>
            </div>
        </Link>
    );
}
