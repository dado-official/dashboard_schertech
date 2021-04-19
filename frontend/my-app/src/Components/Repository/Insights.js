import React from "react";
import { BiStats } from "react-icons/bi";

export default function Insights(props) {
    return (
        <div className="text-white rounded-0.938 bg-primary w-full px-6 py-4">
            <div className="flex flex-row content-evenly items-center ">
                <BiStats size="18"></BiStats>
                <p className="pl-2 font-medium">Insights</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Members: </p>
                <p className=" pl-2 ">{props.members}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Contributors: </p>
                <p className=" pl-2  ">{props.contributors}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Admins: </p>
                <p className=" pl-2  ">{props.admins}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Owner: </p>
                <p className=" pl-2  ">{props.owner}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Lines of Code: </p>
                <p className=" pl-2 text-onlineGreen">{props.linesofcode}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Files: </p>
                <p className=" pl-2  ">{props.files}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Commits: </p>
                <p className=" pl-2  ">{props.commits}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Additions: </p>
                <p className=" pl-2 text-onlineGreen">{props.additions}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Deletions: </p>
                <p className=" pl-2 text-offlineRed">{props.deletions}</p>
            </div>
            <div className="flex flex-row pt-0.938 text-sm">
                <p className="text-unclicked">Branches:</p>
                <p className="  pl-2 ">{props.branches}</p>
            </div>
        </div>
    );
}
