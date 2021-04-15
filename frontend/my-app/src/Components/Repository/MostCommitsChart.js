import React from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { Bar } from "react-chartjs-2";

export default function MostCommitsChart() {
    return (
        <div className="bg-primary tranition ease-in-out w-full rounded-0.938 px-6 py-4 col-span-2 h-minContent">
            <div className="flex items-center gap-2 mb-4">
                <AiOutlineBarChart color="white" size="18" />
                <h6 className="text-white font-medium">Most commits Chart</h6>
            </div>
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
                            backgroundColor: "#3963CD",
                            borderSkipped: false,
                        },
                    ],
                }}
            />
        </div>
    );
}
