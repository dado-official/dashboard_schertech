import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import AddData from "./AddData";
import Progress from "./Progress";
import About from "./About";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Repository({ setUrl }) {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [wishValue, setWishValue] = useState();
    const [apiData, setApiData] = useState({});
    const [progress, setProgress] = useState(0);
    const [remainingTime, setRemainingTime] = useState("");

    const { id } = useParams();

    useEffect(() => {
        setUrl("Custom");
        console.log("ID: " + id);
        axios.get(`http://localhost:4000/api/custom/${id}`).then((res) => {
            if (res.data.data !== undefined) {
                console.log(res.data);
                setApiData(res.data);
                setRemainingTime(res.data.remaining_time);
                console.log(parseFloat(res.data.target_value));
                setWishValue(parseFloat(res.data.target_value));
                setProgress(res.data.progress);
                res.data.data.map((element) => {
                    let unix = element.entry_date;
                    const dateObject = new Date(unix * 1000);

                    let dd = String(dateObject.getDate()).padStart(2, "0");
                    let mm = String(dateObject.getMonth() + 1).padStart(2, "0"); //January is 0!
                    let yyyy = dateObject.getFullYear();

                    let today = mm + "/" + dd + "/" + yyyy;
                    setLabels((prev) => [...prev, today]);
                    setData((prev) => [...prev, parseFloat(element.value)]);

                    console.log(today);
                });
            }
        });
    }, []);

    useEffect(() => {
        if (data !== []) {
            axios.get(`http://localhost:4000/api/custom/${id}`).then((res) => {
                if (res.data.data !== undefined) {
                    setProgress(res.data.progress);
                    setRemainingTime(res.data.remaining_time);
                }
            });
        }
    }, [data]);

    return (
        <div className="main pb-8">
            <div className="relative flex justify-between items-baseline">
                <div>
                    <h6 className="text-2xl text-white font-medium">
                        {apiData.title}
                    </h6>
                    <p className=" text-unclicked">{apiData.description}</p>
                </div>
                <button className="py-2 px-6 bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black">
                    Edit Inputs
                </button>
            </div>
            <div className="grid grid-flow-rows grid-cols-4 gap-8 mt-6 responsiveGrid">
                <Chart dataArray={data} labels={labels} wishValue={wishValue} />
                <div className="flex flex-col gap-8 ">
                    <AddData
                        setData={setData}
                        setLabels={setLabels}
                        labels={labels}
                        id={id}
                        remainingTime={remainingTime}
                    />
                    <Progress
                        isPositive={progress >= 0 ? true : false}
                        percentage={
                            progress === null || progress === undefined
                                ? 0
                                : progress < 0
                                ? progress * -1
                                : progress
                        }
                    />
                    <About
                        frequency={`${apiData.frequency} day${
                            apiData.frequency > 1 ? "s" : ""
                        }`}
                        wishValue={wishValue}
                        setWishValue={setWishValue}
                        description={apiData.description}
                        id={id}
                    />
                </div>
            </div>
        </div>
    );
}
