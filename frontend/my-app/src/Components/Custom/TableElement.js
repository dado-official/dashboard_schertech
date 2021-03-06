import React, { useState } from "react";
import axios from "axios";
import { MdSentimentDissatisfied } from "react-icons/md";
import Cancel from "./Cancel";
import moment from "moment";

export default function TableElement({
    date,
    value,
    id,
    entryId,
    setUpdate,
    setDate,
    setValue,
}) {
    const [valueState, setValueState] = useState(value);
    const [dateState, setDateState] = useState(date);
    const [openCancel, setOpenCancel] = useState(false);
    const [error, setError] = useState("");

    function deleteHandler() {
        axios
            .delete(`http://localhost:4000/api/custom/${entryId}/${id}`)
            .then((res) => {
                console.log(res.data);
                setUpdate((prev) => !prev);
            });
    }

    function updateHandler() {
        if (/\S/.test(valueState) && isNumeric(valueState)) {
            if (!moment(dateState, "DD/MM/YYYY", true).isValid()) {
                setError("Date is invalid");
            } else {
                setError("");
                console.log(
                    moment(dateState, "DD/MM/YYYY").utcOffset("+0000").format()
                );
                console.log();
                axios
                    .put(`http://localhost:4000/api/custom/${entryId}/${id}`, {
                        value: valueState,
                        value_date:
                            Date.parse(
                                moment(dateState, "DD/MM/YYYY")
                                    .utcOffset("+0000")
                                    .format()
                            ) / 1000,
                    })
                    .then((res) => {
                        console.log(res.data);
                        setUpdate((prev) => !prev);
                    });
            }
        } else {
            setError("Invalid input");
        }
    }

    function isNumeric(num) {
        return !isNaN(num);
    }

    return (
        <tr>
            <td>
                <input
                    type="text"
                    onChange={(e) => setDateState(e.target.value)}
                    value={dateState}
                    className="text-sm transition duration-200 ease-in-out border-onlineGreen outline-none py-2 px-3 text-white bg-input w-full rounded-0.625 focus:shadow-focusAdd"
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    onChange={(e) => setValueState(e.target.value)}
                    value={valueState}
                    className="text-sm transition duration-200 ease-in-out border-onlineGreen outline-none py-2 px-3 text-white bg-input w-full rounded-0.625 focus:shadow-focusAdd"
                ></input>
            </td>
            <td className="w-40">
                <p className=" text-offlineRed">{error}</p>
            </td>
            <td className="flex justify-end gap-8">
                <button
                    onClick={() => setOpenCancel(true)}
                    className="py-2 px-6 bg-light focus:outline-none outline-none rounded-0.625 font-medium text-black"
                >
                    Delete
                </button>
                <button
                    onClick={updateHandler}
                    className="py-2 px-6 bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black"
                >
                    Save
                </button>
            </td>
            <Cancel
                isOpen={openCancel}
                setIsOpen={setOpenCancel}
                deleteHandler={deleteHandler}
            />
        </tr>
    );
}
