import React, { useState, useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export default function Chart({ wishValue }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        let ctx = document.getElementById("canvas").getContext("2d");
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "#343434");
        gradient.addColorStop(1, "rgb(52, 52, 52, 0.1)");
        setData([
            {
                label: "Commits",
                data: [1, 2, 3, 4, 8, 0, 2, 5, 9, 1, 5],
                borderSkipped: false,
                borderColor: "#3963CD",
                backgroundColor: gradient,
            },
            {
                label: "Wish Value",
                data: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
                borderColor: "#2DFD99",
            },
        ]);
    }, []);

    return (
        <div className="bg-primary tranition ease-in-out w-full col-span-3 rounded-0.938 px-6 py-4 h-minContent pb-6">
            <div className="flex items-center gap-2 mb-4">
                <AiOutlineBarChart color="white" size="18" />
                <h6 className="text-white font-medium">Custom stats Chart</h6>
            </div>
            <Line
                id="canvas"
                options={{
                    /*elements: {
                        point: {
                            radius: 4,
                            borderWidth: 3,
                            hoverRadius: 6,
                        },
                        line: {
                            borderWidth: 1,
                            borderColor: "rgb(57, 99, 205, 0.5)",
                        },
                    },*/
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    color: "rgb(148, 163, 188,0.3)",
                                    drawBorder: false,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                gridLines: {
                                    color: "rgb(148, 163, 188,0.3)",
                                    drawBorder: false,
                                },
                                ticks: {
                                    maxTicksLimit: 6,
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
                        "123",
                        "sdf",
                        "213",
                        "12",
                    ],
                    datasets: data,
                }}
            />
        </div>
    );
}
