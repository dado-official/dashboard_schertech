import React, { useState, useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { Bar } from "react-chartjs-2";

export default function CommitsPerWeekChart() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 3000);
    }, []);

    return (
        <div className="bg-primary tranition ease-in-out w-full rounded-0.938 px-6 py-4 h-minContent">
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
                            "Red",
                            "Blue",
                            "Yellow",
                            "Green",
                            "Purple",
                            "Orange",
                        ],
                        datasets: [
                            {
                                label: "benni2",
                                data: [67.8, 9, 2],
                                backgroundColor: "#D6E9C6", // green
                            },
                            {
                                label: "Friedemann",
                                data: [20.7],
                                backgroundColor: "#FAEBCC", // yellow
                            },
                            {
                                label: "Mutrecht",
                                data: [11.4],
                                backgroundColor: "#EBCCD1", // red
                            },
                            {
                                label: "hirte",
                                data: [0, 2],
                                backgroundColor: "blue",
                            },
                            {
                                label: "benni",
                                data: [0, 2],
                                backgroundColor: "red",
                            },
                            {
                                label: "huh",
                                data: [0, 8],
                                backgroundColor: "orange",
                            },
                        ],
                    }}
                />
                <div
                    className={`absolute transition ease-in duration-300 ?00 top-1/2 left-1/2 centerAbsolute bg-primary flex justify-center items-center w-full h-full ${
                        loaded ? "opacity-0" : ""
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
