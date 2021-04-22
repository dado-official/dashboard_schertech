import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AddButton({ setIsPopover }) {
    return (
        <div
            onClick={() => setIsPopover((prev) => !prev)}
            className="w-full relative h-full buttonBackground rounded-0.938 transition ease-in-out duration-300 cursor-pointer"
        >
            <div
                className="absolute left-1/2 top-1/2"
                style={{ transform: "translate(-50%, -50%)" }}
            >
                <MdAdd color="white" size={45} />
            </div>
            <div className="bg-white opacity-0 hover:opacity-10 transition duration-300 h-full w-full ease-in-out rounded-0.938"></div>
        </div>
    );
}
