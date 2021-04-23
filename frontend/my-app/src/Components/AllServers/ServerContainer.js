import React, { useState, useEffect } from "react";
import Locaction from "./Location";
import axios from "axios";

export default function ServerContainer({ name, description, setDel }) {
    const [hover, setHover] = useState(false);
    const [online, setOnline] = useState();

    function deleteHandler() {
        axios.delete(`http://localhost:4000/api/server/${name}`).then((res) => {
            setDel((prev) => !prev);
            console.log("delete");
        });
    }

    useEffect(() => {
        let unmounted = false;
        let source = axios.CancelToken.source();
        axios
            .get(`http://localhost:4000/api/server/${name}`, {
                cancelToken: source.token,
            })
            .then((a) => {
                if (!unmounted) {
                    setOnline(a.data.reachable);
                }
            })
            .catch(function (e) {
                if (!unmounted) {
                    if (axios.isCancel(e)) {
                        console.log(`request cancelled:${e.message}`);
                    } else {
                        console.log("another error happened:" + e.message);
                    }
                }
            });
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };
    }, []);

    return (
        <div
            className={`hover:bg-backgroundHover borderHover bg-primary border-l-4 py-3 px-5 pb-4 flex flex-col justify-between tranition ease-in-out cursor-pointer duration-300 w-full ${
                online === undefined
                    ? "border-white"
                    : online
                    ? "border-onlineGreen"
                    : "border-offlineRed"
            } rounded-0.938`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <h6 className="font-medium text-white">{name}</h6>
            <p className="text-unclicked text-sm mt-2">{description}</p>
            <div className="flex mt-4 justify-between">
                <Locaction location="Brixen, Italy" />
                <h6
                    className={`text-unclicked hover:text-white font-semi text-2xl transition eae-in-out duration-300 cursor-pointer ${
                        !hover ? " opacity-0" : ""
                    }`}
                    onClick={deleteHandler}
                >
                    x
                </h6>
            </div>
        </div>
    );
}
