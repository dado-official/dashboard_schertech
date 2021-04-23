import React, { useEffect, useState, useRef } from "react";
import CustomContainer from "./CustomContainer";
import AddButton from "../Shared/AddButton";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";

export default function AllCustom({ setUrl }) {
    const [data, setData] = useState([]);
    const [del, setDel] = useState(false);
    const [isPopover, setIsPopover] = useState(false);

    const addServerRef = useRef();

    useEffect(() => {
        setUrl("Custom");
        axios.get("http://localhost:4000/api/custom").then((res) => {
            console.log(res);
            if (res.data !== "") {
                setData(res.data);
            }
        });
    }, [del]);

    return (
        <div className="main">
            <div className="relative flex justify-between items-baseline">
                <div>
                    <h2 className={`text-white text-2xl font-medium`}>
                        Custom
                    </h2>
                    <p className=" text-unclicked">All the current customs</p>
                </div>
                <button
                    ref={addServerRef}
                    onClick={() => setIsPopover((prev) => !prev)}
                    className="py-2 px-6 bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black"
                >
                    <div className=" flex items-center gap-2">
                        Add Custom
                        <FaAngleDown color="black" size="18" />
                    </div>
                </button>
            </div>
            <div className="grid grid-flow-row gap-8 mt-4 responsiveGrid">
                {data.map((element) => (
                    <CustomContainer
                        key={element.id}
                        name={element.title}
                        description={element.description}
                        setDel={setDel}
                        id={element.id}
                        chart={element.progress}
                        remainingdays={element.remaining_time}
                    />
                ))}
            </div>
        </div>
    );
}
