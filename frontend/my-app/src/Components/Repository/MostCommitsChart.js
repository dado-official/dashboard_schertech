import React, { useState, useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import axios from "axios";

defaults.global.defaultFontFamily = "Montserrat";
defaults.global.defaultFontColor = "#94A3BC";

export default function MostCommitsChart({ workspaceReposlug }) {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (workspaceReposlug !== undefined) {
            console.log(
                `http://localhost:4000/api/repository/${workspaceReposlug.workspace}/${workspaceReposlug.repoSlug}/chart2`
            );
            axios
                .get(
                    `http://localhost:4000/api/repository/${workspaceReposlug.workspace}/${workspaceReposlug.repoSlug}/chart2`
                )
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                    setLoaded(true);
                });
        }
    }, [workspaceReposlug]);

    return (
        <div
            className="bg-primary enter flex flex-col w-full rounded-0.938 px-6 py-4 duration-500 ease-in transition-all"
            style={{ animationDelay: "0.4s" }}
        >
            <div className="flex items-center gap-2 mb-4">
                <AiOutlineBarChart color="white" size="18" />
                <h6 className="text-white font-medium">
                    Most commits last 7 days chart
                </h6>
            </div>
            <div className="relative">
                <Bar
                    options={{
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false,
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    gridLines: {
                                        color: "#94A3BC",
                                        drawBorder: false,
                                    },
                                    ticks: {
                                        maxTicksLimit: 4,
                                        padding: 16,
                                    },
                                },
                            ],
                        },
                    }}
                    data={{
                        labels: data.user,
                        datasets: [
                            {
                                label: "Commits",
                                data: data.commitanzahl,
                                backgroundColor: "#81c784",
                                borderSkipped: false,
                            },
                        ],
                    }}
                />
                <div
                    className={`absolute transition ease-in duration-300 ?00 top-1/2 left-1/2 centerAbsolute bg-primary flex justify-center items-center w-full h-full ${
                        loaded ? "opacity-0 -z-10" : ""
                    }`}
                >
                    <div class="sk-folding-cube">
                        <div class="sk-cube1 sk-cube"></div>
                        <div class="sk-cube2 sk-cube"></div>
                        <div class="sk-cube4 sk-cube"></div>
                        <div class="sk-cube3 sk-cube"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
