import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import AddData from "./AddData";
import Progress from "./Progress";
import About from "./About";

export default function Repository({ setUrl }) {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [wishValue, setWishValue] = useState(3.5);

    useEffect(() => {
        setUrl("Custom");
    }, []);

    return (
        <div className="main pb-8">
            <h6 className="text-2xl text-white font-medium">Customname</h6>
            <div className="grid grid-flow-rows grid-cols-4 gap-8 mt-8">
                <Chart dataArray={data} labels={labels} wishValue={wishValue} />
                <div className="flex flex-col gap-8">
                    <AddData
                        setData={setData}
                        setLabels={setLabels}
                        labels={labels}
                    />
                    <Progress isPositive={true} percentage={34.9} />
                    <About
                        frequency="1 day"
                        wishValue={wishValue}
                        setWishValue={setWishValue}
                        description="Description"
                    />
                </div>
            </div>
        </div>
    );
}
