import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function About({
    frequency,
    wishValue,
    setWishValue,
    description,
}) {
    const [error, setError] = useState("");
    const [input, setInput] = useState(wishValue);

    function inputHandler(e) {
        setInput(e.target.value);
        if (!isNumeric(e.target.value)) {
            setError("Please enter a number");
        } else {
            if (e.target.value !== "") {
                setWishValue(parseFloat(e.target.value));
            }
            setError("");
        }
    }

    function isNumeric(num) {
        return !isNaN(num);
    }

    return (
        <div className="text-white rounded-0.938 bg-primary w-full px-6 py-4">
            <div className="flex gap-2 items-center ">
                <AiOutlineInfoCircle color="white" size="18" />
                <p className="font-medium">About</p>
                <p className="text-offlineRed">{error}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Frequency: </p>
                <p className=" pl-2 ">{frequency}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Wish Value: </p>
                <input
                    className="focus:outline-none pl-2 bg-transparent w-1/2"
                    value={input}
                    onChange={inputHandler}
                />
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Description: </p>
                <p className=" pl-2  ">{description}</p>
            </div>
        </div>
    );
}
