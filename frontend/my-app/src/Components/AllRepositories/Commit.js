import React from "react";

export default function Commit({ change }) {
    return (
        <div className="bg-hover py-2 px-4 rounded-0.938 flex items-center gap-2">
            <p className="text-xs text-white ">
                Last Change:{" "}
                <span className=" text-commitBlue font-semibold">
                    10 min. ago
                </span>
            </p>
        </div>
    );
}
