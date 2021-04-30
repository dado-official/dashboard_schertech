import React, { useState, useEffect } from "react";
import Commit from "./Commit";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";


export default function RepositoryNotReachableContainer({ name, description, workspace, repo_slug, id, setDel }) {
    const [hover, setHover] = useState(false);

    const history = useHistory();

    function removeRepository(e){
        e.preventDefault();
        axios.delete("http://localhost:4000/api/repository/" + workspace + "/" + repo_slug +"/")
        .then((resp) => {
                console.log("delete");
                setDel((prev) => !prev);
        });
    }

    return (
        <div
            className="bg-primary hover:bg-backgroundHover cursor-pointer rounded-0.938 py-3 px-4 w-full border-offlineRed"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex justify-between">
                <h6 className="text-white ">{name}</h6>
            </div>
            <p className="text-unclicked text-sm mt-2">{description}</p>
            <div className="flex mt-4 justify-between">
                <h6
                    onClick={removeRepository}
                    className={`text-unclicked hover:text-white font-semi text-2xl transition eae-in-out duration-300 cursor-pointer ${
                        !hover ? " opacity-0" : ""
                    }`}
                >
                    x
                </h6>
            </div>
        </div>
    );
}
