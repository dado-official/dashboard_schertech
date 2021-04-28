import React, { useState } from "react";
import { BiGitBranch } from "react-icons/bi";
import { GoGitCommit } from "react-icons/go";
import { HiHashtag } from "react-icons/hi";

export default function Commit({
    message,
    username,
    usernameRaw,
    userPicture,
    hash,
    commitID,
    date,
    lastChange
}) {
    return (
        <div className=" overflow-x-auto w-full bg-hover p-3 rounded-0.938 mt-4">
            <p className="text-white text-sm">{message}</p>
            <div className="flex gap-1 items-center mt-2">
                <img
                    src={userPicture}
                    alt="profile picture"
                    className="h-0.875 w-0.875 rounded-3px"
                />
                <p className="text-unclicked text-xs">
                    <span className="text-white">{username}</span> commitet{" "}
                    {lastChange}
                </p>
            </div>
            <div className="mt-1 ">
                <div className="flex gap-1 items-center">
                    <GoGitCommit color="#94A3BC" size="16" />
                    <p className="text-unclicked text-xs">{commitID} </p>
                </div>
                <div className="flex gap-1 items-center">
                    <div>
                        <HiHashtag color="#94A3BC" size="16"/>
                    </div>
                    
                    <p className="text-unclicked text-xs">{hash} </p>
                </div>
            </div>
        </div>
    );
}
