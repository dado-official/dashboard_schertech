import React, { useState, useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { Bar } from "react-chartjs-2";
import axios from "axios";

export default function CommitsPerWeekChart({ workspaceReposlug }) {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (workspaceReposlug !== undefined) {
            console.log(
                `http://localhost:4000/api/repository/${workspaceReposlug.workspace}/${workspaceReposlug.repoSlug}/chart1`
            );
            axios
                .get(
                    `http://localhost:4000/api/repository/${workspaceReposlug.workspace}/${workspaceReposlug.repoSlug}/chart1`
                )
                .then((res) => {
                    setData(res.data);
                    setLoaded(true);
                });
        }
    }, [workspaceReposlug]);

    return (
        <div
            className="bg-primary tranition ease-in-out w-full enter rounded-0.938 px-6 py-4 h-minContent"
            style={{ animationDelay: "0.6s" }}
        >
            <div className="flex items-center gap-2 mb-4">
                <AiOutlineBarChart color="white" size="18" />
                <h6 className="text-white font-medium">
                    Commits per Week Chart
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
                                    stacked: true,
                                },
                            ],
                            yAxes: [
                                {
                                    stacked: true,
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
                        labels: [
                            "this week",
                            "last week",
                            "two weeks ago",
                            "three weeks ago",
                            "four weeks ago",
                        ],
                        datasets: [
                            {
                                label: "Commits",
                                data: data,
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
