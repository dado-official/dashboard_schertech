import React from "react";

const TextArea = (props) => {
    return (
        <textarea
            onChange={(e) => props.setState(e.target.value)}
            value={props.state}
            className=" text-sm transition duration-300 ease-in-out resize-none mt-2 outline-none py-2 px-3 text-white bg-input2 w-full h-5.063 rounded-0.625 mb-7 focus:border-onlineGreen"
        ></textarea>
    );
};

export default TextArea;
