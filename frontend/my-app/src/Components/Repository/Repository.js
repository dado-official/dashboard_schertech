import React, { useState, useEffect } from "react";
import { BiLockAlt } from "react-icons/bi";
import { BiLockOpenAlt } from "react-icons/bi";
import Insights from "./Insights";
import LatestCommits from "./LatestCommits";
import MostCommitsChart from "./MostCommitsChart";
import CommitsPerWeekChart from "./CommitsPerWeekChart";
import axios from "axios";

export default function Repository({ setUrl, props }) {
    const [name, setName] = useState("Repositoryname");
    const [owner, setOwner] = useState("Repo Owner");
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        //setName(props.name)
        setUrl("Repository");
        /* axios
            .get(
                "http://localhost:4000/api/repository/" +
                    props.workspace +
                    "/" +
                    props.reposlug +
                    "/"
            )
            .then((resp) => {
                setIsPrivate(resp.data.is_private);
            });*/
    }, []);

    return (
        <div className="main pb-8">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <img
                        src="https://d301sr5gafysq2.cloudfront.net/99622dff891f/img/repo-avatars/default.png"
                        alt="Repo photo"
                        className="h-20 w-20 rounded-0.938"
                    />
                    <div>
                        <h2 className={`text-white text-2xl font-medium`}>
                            {name}
                        </h2>
                        <div className="flex items-center gap-1">
                            {isPrivate ? (
                                <BiLockAlt color="#94A3BC" size="14" />
                            ) : (
                                <BiLockOpenAlt color="#94A3BC" />
                            )}
                            <p className=" text-unclicked text-sm">
                                {isPrivate ? "Private" : "Public"}
                            </p>
                        </div>
                    </div>
                </div>
                <button className="bg-onlineGreen transition ease-in-out duration-300 px-6 py-2 font-medium rounded-0.938 h-minContent">
                    Go to Repository
                </button>
            </div>
            <div className="flex w-full">
                <div className="grid grid-flow-rows grid-cols-4 gap-8 mt-8 w-full">
                    <LatestCommits />
                    <div className="flex flex-col gap-8 col-span-2">
                        <MostCommitsChart />
                        <CommitsPerWeekChart />
                    </div>
                    <Insights
                        members="42"
                        contributors="21"
                        admins="2"
                        owner="seppele"
                        linesofcode="22.6K"
                        files="73"
                        commits="93"
                        additions="70.3K"
                        deletions="7.7K"
                        branches="2"
                    />
                </div>
            </div>
        </div>
    );
}
