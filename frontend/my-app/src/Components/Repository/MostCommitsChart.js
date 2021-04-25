import React, { useState, useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
defaults.global.defaultFontFamily = "Montserrat";
defaults.global.defaultFontColor = "#94A3BC";

export default function MostCommitsChart() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 3000);
    }, []);

    return (
        <div className="bg-primary flex flex-col w-full rounded-0.938 px-6 py-4 duration-500 ease-in transition-all">
            <div className="flex items-center gap-2 mb-4">
                <AiOutlineBarChart color="white" size="18" />
                <h6 className="text-white font-medium">Most commits Chart</h6>
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
                                label: "Commits",
                                data: [1, 2, 3, 4, 8, 0],
                                backgroundColor: "#81c784",
                                borderSkipped: false,
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
