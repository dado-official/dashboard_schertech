import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import AddData from "./AddData";
import Progress from "./Progress";
import About from "./About";
import axios from "axios";
import { useParams } from "react-router-dom";
import Edit from "./Edit";

export default function Repository({ setUrl }) {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [wishValue, setWishValue] = useState();
    const [apiData, setApiData] = useState({});
    const [progress, setProgress] = useState(0);
    const [remainingTime, setRemainingTime] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [dataId, setDataId] = useState([]);
    const [update, setUpdate] = useState(false);

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
                let dataArray = [];
                let dataIdArray = [];
                let labelsArray = [];
                res.data.data.map((element) => {
                    let unix = element.value_date;
                    const dateObject = new Date(unix * 1000);

                    let dd = String(dateObject.getDate()).padStart(2, "0");
                    let mm = String(dateObject.getMonth() + 1).padStart(2, "0"); //January is 0!
                    let yyyy = dateObject.getFullYear();

                    let today = dd + "/" + mm + "/" + yyyy;
                    dataArray.push(parseFloat(element.value));
                    labelsArray.push(today);
                    dataIdArray.push(element.value_id);
                });
                setLabels(labelsArray);
                setDataId(dataIdArray);
                setData(dataArray);
            }
        });
    }, [update]);

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
        <div className="pb-8 main">
            <div className="relative flex justify-between items-baseline enter flex-wrap gap-4">
                <div>
                    <h6 className="text-2xl text-white font-medium">
                        {apiData.title}
                    </h6>
                    <p className=" text-unclicked">{apiData.description}</p>
                </div>
                <button
                    onClick={() => setShowEdit((prev) => !prev)}
                    className="py-2 px-6 bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black"
                >
                    {!showEdit ? "Edit data" : "Exit"}
                </button>
            </div>
            <div className="relative grid grid-flow-rows gap-8 grid-cols-4 mt-6 responsiveGridCustom">
                <Edit
                    show={showEdit}
                    data={data}
                    labels={labels}
                    dataId={dataId}
                    entryId={id}
                    setUpdate={setUpdate}
                    setValue={setData}
                    setDate={setLabels}
                />
                <Chart dataArray={data} labels={labels} wishValue={wishValue} />
                <div className="flex gap-8 w-full flex-col">
                    <AddData
                        setData={setData}
                        setLabels={setLabels}
                        labels={labels}
                        id={id}
                        remainingTime={remainingTime}
                        setUpdate={setUpdate}
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
