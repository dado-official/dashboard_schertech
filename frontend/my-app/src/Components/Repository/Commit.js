import React, { useState } from "react";
import { BiGitBranch } from "react-icons/bi";
import { GoGitCommit } from "react-icons/go";

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
        <div className="w-full bg-hover px-4 py-3 rounded-0.938 mt-4">
            <p className="text-white text-sm">{message}</p>
            <p className="text-unclicked text-xs">{messageLong}</p>
            <div className="flex gap-1 items-center mt-2">
                <p className="text-unclicked text-xs">
                    <span className="text-white">{username}</span> commited{" "}
                    {date}
                </p>
            </div>
        </div>
    );
}
