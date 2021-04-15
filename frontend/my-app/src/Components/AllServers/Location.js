import React from "react";
import { MdLocationOn } from "react-icons/md";

export default function Location({ location }) {
    return (
        <div className="bg-hover py-2 px-4 rounded-0.938 flex items-center gap-2">
            <p className="text-xs text-white ">{location}</p>
            <MdLocationOn color="white" />
        </div>
    );
}
