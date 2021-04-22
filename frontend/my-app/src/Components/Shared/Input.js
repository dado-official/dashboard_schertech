import React, { useState } from "react";

const Input = (props) => {
    return (
        <input
            type={`${props.type === "password" ? "password" : "text"}`}
            onChange={(e) => props.setState(e.target.value)}
            value={props.state}
            className=" text-sm transition duration-200 ease-in-out outline-none py-1 px-2 text-white bg-input2 w-full mb-5 mt-2 rounded-0.625 focus:shadow-focusAdd"
        ></input>
    );
};

export default Input;
