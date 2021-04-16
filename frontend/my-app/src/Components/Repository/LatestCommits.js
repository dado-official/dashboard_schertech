import React from "react";
import { FaHistory } from "react-icons/fa";
import Commit from "./Commit";

export default function LatestCommits() {
    return (
        <div className="bg-primary hover:bg-backgroundHover tranition ease-in-out w-full rounded-0.938 px-6 py-4">
            <div className="flex gap-2 items-center">
                <FaHistory color="white" />
                <h6 className="text-white ">Latest commits</h6>
            </div>
            <Commit
                message="Commit Message"
                messageLong="Long Commit message comes here"
                username="username"
                userPicture="https://i.stack.imgur.com/frlIf.png"
                branch="main"
                commitID="54df32c"
                date="10 min. ago"
            />
            <Commit
                message="Commit Message"
                messageLong="Long Commit message comes here"
                username="username"
                userPicture="https://i.stack.imgur.com/frlIf.png"
                branch="main"
                commitID="54df32c"
                date="10 min. ago"
            />
            <Commit
                message="Commit Message"
                messageLong="Long Commit message comes here"
                username="username"
                userPicture="https://i.stack.imgur.com/frlIf.png"
                branch="main"
                commitID="54df32c"
                date="10 min. ago"
            />
            <Commit
                message="Commit Message"
                messageLong="Long Commit message comes here"
                username="username"
                userPicture="https://i.stack.imgur.com/frlIf.png"
                branch="main"
                commitID="54df32c"
                date="10 min. ago"
            />
        </div>
    );
}
