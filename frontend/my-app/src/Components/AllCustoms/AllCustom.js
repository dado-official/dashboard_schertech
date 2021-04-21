import React, { useEffect, useState } from "react";
import CustomContainer from "./CustomContainer";
import AddButton from "../Shared/AddButton";
import axios from "axios";

export default function AllCustom({ setUrl }) {
    const [data, setData] = useState([]);
    const [del, setDel] = useState(false);

    useEffect(() => {
        setUrl("Custom");
        axios.get("http://localhost:4000/api/custom").then((res) => {
            setData(res.data);
        });
    }, [del]);

    return (
        <div className="main">
            <h2 className={`text-white text-2xl font-medium`}>Custom</h2>
            <p className=" text-unclicked">All the current customs</p>
            <div className="grid grid-flow-row gap-8 mt-4 responsiveGrid">
                {data.map((element) => (
                    <CustomContainer
                        key={element.id}
                        name={element.title}
                        description={element.description}
                        setDel={setDel}
                        id={element.id}
                    />
                ))}
                <AddButton title="custom" />
            </div>
        </div>
    );
}
