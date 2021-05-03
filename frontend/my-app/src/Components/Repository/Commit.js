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
    lastChange,
    index,
}) {
    return (
        <div
            className=" overflow-x-auto w-full bg-hover p-3 rounded-0.938 mt-4 enter"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <p className="text-white break-all text-sm">{message}</p>
            <div className="flex gap-1 mt-2">
                <img
                    src={userPicture}
                    alt="profile picture"
                    className="h-0.875 w-0.875 rounded-3px"
                />
                <p className="text-unclicked text-xs">
                    <span className="text-white">{username}</span> committed{" "}
                    {lastChange}
                </p>
            </div>
            <div className="mt-1 ">
                <div className="flex gap-1">
                    <GoGitCommit color="#94A3BC" size="16" />
                    <p className="text-unclicked  text-xs">{commitID} </p>
                </div>
                <div className="flex gap-1">
                    <div>
                        <HiHashtag color="#94A3BC" size="16" />
                    </div>

                    <p className="text-unclicked break-all text-xs">{hash} </p>
                </div>
            </div>
        </div>
    );
}
