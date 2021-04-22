import React, { useState } from "react";

const Input = (props) => {
    return (
        <input
            type={`${props.type === "password" ? "password" : "text"}`}
            onChange={(e) => props.setState(e.target.value)}
            value={props.state}
            className=" text-sm transition duration-200 ease-in-out outline-none py-2 px-3 text-white bg-input2 w-full mb-5 mt-2 rounded-0.625 focus:border-onlineGreen"
        ></input>
    );
};

export default Input;
