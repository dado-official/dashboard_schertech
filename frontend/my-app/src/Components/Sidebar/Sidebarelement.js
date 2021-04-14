import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebarelement(props) {
    const [color, setcolor] = useState("#94A3BC");
    const Icon = props.icon;
    return (
        <Link
            to={`/${props.title.toLowerCase()}`}
            onMouseEnter={() => setcolor("white")}
            onMouseLeave={() => setcolor("#94A3BC")}
            className={` 
                mb-2 cursor-pointer 
                rounded-0.938 
                pt-1
                pb-1 
                pl-1.131 
                flex flex-row content-evenly items-center 
                bg-primary 
                hover:text-white
                ${
                    props.url === props.title
                        ? "text-white bg-hover"
                        : "text-unclicked"
                }
        `}
        >
            <Icon
                color={`${props.url === props.title ? "white" : color}`}
            ></Icon>
            <p
                className=" 
                    pl-3
                    align-middle 
                    "
            >
                {props.title}
            </p>
        </Link>
    );
}
