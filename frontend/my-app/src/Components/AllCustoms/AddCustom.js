import React, { useState } from "react";
import Input from "../Shared/Input";
import TextArea from "../Shared/TextArea";
import { RangeStepInput } from "react-range-step-input";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddCustom = ({ setIsPopover, isPopover, setUpdate }) => {
    const [customName, setCustomName] = useState("");
    const [interval, setInterval] = useState(1);
    const [desciption, setDescription] = useState("");
    const [wishValue, setWishValue] = useState();
    const [error, setError] = useState("");

    const history = useHistory();

    function isNumeric(num) {
        return !isNaN(num);
    }

    function subm() {
        if (!/\S/.test(customName)) {
            setError("Enter a custom name");
        } else if (!/\S/.test(wishValue)) {
            setError("Enter a wishvalue");
        } else if (!isNumeric(wishValue)) {
            setError("Wishvalue should be a number");
        } else if (!isNumeric(interval)) {
            setError("Enter a frequency");
        } else if (!isNumeric(interval)) {
            setError("Fruequency should be a number");
        } else {
            console.log("Custom Name: ", customName);
            console.log("Interval: ", interval);
            console.log("Description: ", desciption);
            axios
                .post("http://localhost:4000/api/custom", {
                    title: customName,
                    description: desciption,
                    frequency: interval,
                    target_value: wishValue,
                })
                .then((res) => {
                    history.push("/custom");
                    console.log(res.data);
                    setUpdate((prev) => !prev);
                    setIsPopover(false);
                });
        }
    }

    return (
        <div
            className={`bg-input rounded-0.938 w-26 p-8 z-10 absolute right-0 top-14 border-onlineGreen border-4 ${
                isPopover ? "" : "hidden"
            }`}
        >
            <p className="text-xl text-white mb-5">Add Custom</p>
            <div className="flex gap-4">
                <div className="w-full">
                    <p className=" text-white text-sm ">Custom Name</p>
                    <Input state={customName} setState={setCustomName}></Input>
                </div>
                <div className="w-full">
                    <p className=" text-white text-sm ">Wish Value</p>
                    <Input state={wishValue} setState={setWishValue} />
                </div>
            </div>
            <p className=" text-white text-sm ">Frequency (days)</p>
            <Input state={interval} setState={setInterval}>
                {interval}
            </Input>
            <p className=" text-white text-sm ">Description</p>
            <TextArea state={desciption} setState={setDescription}></TextArea>
            <p className="text-offlineRed mb-5">{error}</p>
            <button
                onClick={subm}
                className="focus:outline-none bg-onlineGreen rounded-0.625 py-2 px-8 text-center text-black font-medium"
            >
                Add Custom
            </button>
        </div>
    );
};

export default AddCustom;
