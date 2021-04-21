import React, { useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";

export default function AddData({ setData, setLabels, labels, id }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    function addDataHandler() {
        if (isNumeric(input)) {
            setData((prev) => [...prev, parseFloat(input)]);
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, "0");
            let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            let yyyy = today.getFullYear();

            today = mm + "/" + dd + "/" + yyyy;
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
    }

    function inputHandler(e) {
        setInput(e.target.value);
        if (!isNumeric(e.target.value)) {
            setError("Please enter a number");
        } else {
            setError("");
        }
    }

    function isNumeric(num) {
        return !isNaN(num);
    }

    return (
        <div className="text-white rounded-0.938 bg-primary w-full px-6 py-4 h-minContent pb-6">
            <div className="flex items-center gap-2">
                <IoMdAdd color="white" size="18" />
                <p className="font-medium">Add Data</p>
                <p className="text-offlineRed">{error}</p>
            </div>
            <p className="text-sm my-2 text-unclicked">Data</p>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    onChange={inputHandler}
                    value={input}
                    className="pl-4 text-sm transition duration-200 ease-in-out outline-none py-1 px-2 text-white bg-input w-full rounded-0.625 focus:shadow-focusAdd"
                ></input>
                <div
                    onClick={addDataHandler}
                    className="flex gap-1 items-center justify-center rounded-0.625 px-3 py-1 w-full text-center text-white bg-commitBlue h-minContent cursor-pointer"
                >
                    <IoMdAdd color="white" size="14" />
                    <p className="text-sm">Add</p>
                </div>
            </div>
        </div>
    );
}
