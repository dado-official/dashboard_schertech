import React, { useState, useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
defaults.global.defaultFontFamily = "Montserrat";
defaults.global.defaultFontColor = "#94A3BC";

export default function Chart({ wishValue, dataArray, labels }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        let ctx = document.getElementById("canvas").getContext("2d");
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "#343434");
        gradient.addColorStop(1, "rgb(52, 52, 52, 0.1)");
        setData([
            {
                label: "Commits",
                data: dataArray,
                borderSkipped: false,
                borderColor: "#3963CD",
                backgroundColor: gradient,
            },
            {
                label: "Wish Value",
                radius: 0,
                data: Array(dataArray.length).fill(wishValue),
                borderCapStyle: "butt",
                borderDash: [15, 15],
                hoverRadius: 0,
                borderColor: "rgb(45, 253, 153, 0.9)",
                fill: false,
            },
        ]);
    }, [dataArray, wishValue]);

    return (
        <div className="bg-primary tranition ease-in-out w-full col-span-3 rounded-0.938 px-6 py-4 h-minContent pb-6">
            <div className="flex items-center gap-2 mb-4">
                <AiOutlineBarChart color="white" size="18" />
                <h6 className="text-white font-medium">Custom stats Chart</h6>
            </div>
            <Line
                id="canvas"
                options={{
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 20,
                        },
                    },
                    elements: {
                        point: {
                            radius: 4,
                            borderWidth: 3,
                            hoverRadius: 6,
                            hoverBorderWidth: 5,
                        },
                        line: {
                            borderWidth: 2,
                            borderColor: "rgb(57, 99, 205, 0.5)",
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    color: "rgb(148, 163, 188,0.3)",
                                    drawBorder: false,
                                },
                                ticks: {
                                    maxTicksLimit: 10,
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
                    labels: labels,
                    datasets: data,
                }}
            />
        </div>
    );
}
