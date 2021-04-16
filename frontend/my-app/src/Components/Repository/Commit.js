import React, { useState } from "react";
import { BiGitBranch } from "react-icons/bi";
import { GoGitCommit } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa";

export default function Commit({
    message,
    messageLong,
    username,
    userPicture,
    branch,
    commitID,
    date,
}) {
    return (
        <div className="w-full relative bg-hover px-4 py-3 rounded-0.938 mt-4 hover:bg-hoverLight duration-500 transition ease-in-out">
            <p className="text-white text-sm">{message}</p>
            <p className="text-unclicked text-xs h-10">{messageLong}</p>
            <div className="flex gap-1 items-center mt-2">
                <img
                    src={userPicture}
                    alt="profile picture"
                    className="h-0.875 w-0.875 rounded-3px"
                />
                <p className="text-unclicked text-xs">
                    <span className="text-white">{username}</span> {date}
                </p>
            </div>
            <div className="mt-1 flex justify-between">
                <div className="flex gap-1 items-center">
                    <BiGitBranch color="#94A3BC" size="14" />
                    <p className="text-unclicked text-xs">{branch} </p>
                </div>
                <div className="flex gap-1 items-center">
                    <GoGitCommit color="#94A3BC" size="16" />
                    <p className="text-unclicked text-xs">{commitID} </p>
                </div>
            </div>
            <div
                className="absolute right-4 top-1/2"
                style={{ transform: "translateY(-50%)" }}
            >
                <FaChevronRight color="#3963CD" size="24" />
            </div>
        </div>
    );
}
