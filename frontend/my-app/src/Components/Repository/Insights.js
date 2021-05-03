import React from "react";
import { BiStats } from "react-icons/bi";

export default function Insights(props) {
    return (
        <div
            className="text-white rounded-0.938 bg-primary enter w-full px-6 py-4 mb-8 2xl:mb-0"
            style={{ animationDelay: "0.8s" }}
        >
            <div className="flex flex-row content-evenly items-center ">
                <BiStats size="18"></BiStats>
                <p className="pl-2 font-medium">Insights</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Owner: </p>
                <p className=" pl-2  ">{props.owner}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Branches:</p>
                <p className="  pl-2 ">{props.branches}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Commits:</p>
                <p className="  pl-2 ">{props.commits}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Created on:</p>
                <p className="  pl-2 ">{props.created_on}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Last update:</p>
                <p className="  pl-2 ">{props.last_updated_date}</p>
            </div>
        </div>
    );
}
