import React, { useEffect } from "react";
import TableElement from "./TableElement";
import { MdEdit } from "react-icons/md";

export default function Edit({
    show,
    data,
    labels,
    dataId,
    entryId,
    setUpdate,
    setValue,
    setDate,
}) {
    useEffect(() => {
        if (show) {
            setUpdate((prev) => !prev);
        }
    }, [show]);
    return (
        <div
            className={`h-full absolute top-0 left-0 bg-primary w-full rounded-0.938 p-6 ${
                !show ? "hidden" : ""
            }`}
        >
            <div className="flex gap-2 mb-5">
                <MdEdit color="white" size={18} />
                <p className="font-medium text-white">Edit Data</p>
            </div>
            <div className="overflow-auto h-5/6">
                <table className="w-full">
                    <thead className="text-white text-left">
                        <tr>
                            <th className="px-4">Date</th>
                            <th className="px-4">Value</th>
                        </tr>
                    </thead>
                    <tbody className="text-unclicked ">
                        {data
                            .map((element, index) => {
                                return (
                                    <TableElement
                                        value={element}
                                        date={
                                            labels[index] !== undefined
                                                ? labels[index]
                                                : null
                                        }
                                        key={dataId[index]}
                                        id={dataId[index]}
                                        entryId={entryId}
                                        setUpdate={setUpdate}
                                        setValue={setValue}
                                        setDate={setDate}
                                    />
                                );
                            })
                            .reverse()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
