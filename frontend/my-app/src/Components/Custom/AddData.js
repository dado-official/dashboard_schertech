import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import Warning from "./Warning";

export default function AddData({
    setData,
    setLabels,
    labels,
    id,
    remainingTime,
}) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [openWarning, setOpenWarning] = useState(false);
    const [canAdd, setCanAdd] = useState(false);

    useEffect(() => {
        setCanAdd(
            remainingTime === undefined ? true : remainingTime.includes("ago")
        );
    }, [remainingTime]);

    function addDataHandler() {
        if (/\S/.test(input) && isNumeric(input)) {
            if (canAdd) {
                addData();
            } else {
                setOpenWarning(true);
            }
        }
    }

    function addData() {
        setData((prev) => [...prev, parseFloat(input)]);
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + "/" + mm + "/" + yyyy;
        setLabels((prev) => [...prev, today]);

        setInput("");

        axios
            .post(`http://localhost:4000/api/custom/${id}`, {
                value: parseFloat(input),
            })
            .then((res) => {
                console.log(res.data);
            });
    }

    function inputHandler(e) {
        if (!openWarning) {
            setInput(e.target.value);
            if (!isNumeric(e.target.value)) {
                setError("Please enter a number");
            } else {
                setError("");
            }
        }
    }

    function isNumeric(num) {
        return !isNaN(num);
    }

    return (
        <div className="text-white rounded-0.938 bg-primary w-full px-6 py-4 h-minContent pb-6">
            <Warning
                isOpen={openWarning}
                setIsOpen={setOpenWarning}
                addHandler={addData}
                waitTime={remainingTime}
            />
            <div className="flex items-center gap-2">
                <IoMdAdd color="white" size="18" />
                <p className="font-medium">Add Data</p>
            </div>
            <p className="text-offlineRed">{error}</p>
            <p className="text-sm my-2 text-unclicked">Data</p>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    onChange={inputHandler}
                    value={input}
                    className="pl-4 text-sm transition duration-200 ease-in-out border-onlineGreen outline-none py-2 px-3 text-white bg-input w-full rounded-0.625 focus:shadow-focusAdd"
                ></input>
                <div
                    onClick={addDataHandler}
                    className="flex gap-1 items-center justify-center rounded-0.625 px-3 py-2 w-full text-center text-black font-medium bg-onlineGreen h-full cursor-pointer"
                >
                    <p className="text-sm font-medium">Add</p>
                    <IoMdAdd color="black" size="14" />
                </div>
            </div>
        </div>
    );
}
