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

    const { id } = useParams();

    useEffect(() => {
        setUrl("Custom");
        console.log("ID: " + id);
        axios.get(`http://localhost:4000/api/custom/${id}`).then((res) => {
            if (res.data.data !== undefined) {
                console.log(res.data);
                setApiData(res.data);
                console.log(parseFloat(res.data.target_value));
                setWishValue(parseFloat(res.data.target_value));
                res.data.data.map((element) => {
                    let unix = parseFloat(element.date);
                    const dateObject = new Date(unix);

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

    return (
        <div className="main pb-8">
            <h6 className="text-2xl text-white font-medium">{apiData.title}</h6>
            <div className="grid grid-flow-rows grid-cols-4 gap-8 mt-8 responsiveGrid">
                <Chart dataArray={data} labels={labels} wishValue={wishValue} />
                <div className="flex flex-col gap-8 ">
                    <AddData
                        setData={setData}
                        setLabels={setLabels}
                        labels={labels}
                        id={id}
                    />
                    <Progress isPositive={true} percentage={34.9} />
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
