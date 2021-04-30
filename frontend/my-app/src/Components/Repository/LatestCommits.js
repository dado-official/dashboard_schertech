import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import Commit from "./Commit";
import { defaults } from "react-chartjs-2";
import axios from "axios";

defaults.global.defaultFontFamily = "Montserrat";
defaults.global.defaultFontColor = "#94A3BC";

export default function LatestCommits({ workspaceReposlug }) {
    const [state, setstate] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (workspaceReposlug !== undefined) {
            console.log(
                `http://localhost:4000/api/repository/${workspaceReposlug.workspace}/${workspaceReposlug.repoSlug}/lastcommits`
            );
            axios
                .get(
                    `http://localhost:4000/api/repository/${workspaceReposlug.workspace}/${workspaceReposlug.repoSlug}/lastcommits`
                )
                .then((res) => {
                    setstate(res.data);
                    setLoaded(true);
                });
        }
    }, [workspaceReposlug]);

    return (
        <div className="bg-primary overflow-auto w-full h-vhheight 2xl:h-full rounded-0.938 px-6 py-4 2xl:mb-8">
            <div className="flex gap-2 items-center">
                <FaHistory color="white" />
                <h6 className="text-white font-medium">Latest commits</h6>
            </div>
            <div className="">
                {state != null ? (
                    state.map((element) => (
                        <Commit
                            commitID={element.id}
                            hash={element.hash}
                            message={element.message}
                            username={element.author_name}
                            usernameRaw={element.author_raw}
                            date={element.date}
                            lastChange={element.last_change}
                            userPicture={
                                element.author_icon !== undefined
                                    ? element.author_icon
                                    : "https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png"
                            }
                        />
                    ))
                ) : (
                    <p>loading ...</p>
                )}
            </div>
        </div>
    );
}
