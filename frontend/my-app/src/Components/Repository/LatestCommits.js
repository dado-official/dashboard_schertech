import React from "react";
import { FaHistory } from "react-icons/fa";
import Commit from "./Commit";
import { defaults } from "react-chartjs-2";
defaults.global.defaultFontFamily = "Montserrat";
defaults.global.defaultFontColor = "#94A3BC";

export default function LatestCommits() {
    return (
        <div className="bg-primary w-full rounded-0.938 px-6 py-4">
            <div className="flex gap-2 items-center">
                <FaHistory color="white" />
                <h6 className="text-white font-medium">Latest commits</h6>
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
