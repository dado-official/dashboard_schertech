import React, { useState, useEffect } from "react";
import Commit from "./Commit";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";


export default function RepositoryContainer({ name, description, workspace, repo_slug, id, setDel }) {
    const [hover, setHover] = useState(false);
    const [owner, setOwner] = useState("");
    const [lastEdit, setEdit] = useState("");

    const history = useHistory();

    useEffect(() => {
        axios
            .get(
                "http://localhost:4000/api/repository/" +
                    workspace +
                    "/" +
                    repo_slug +
                    "/menu"
            )
            .then((resp) => {
                setOwner(resp.data.owner_name);
                setEdit(resp.data.last_update_fromnow);
            });
    }, []);

    function removeRepository(e){
        e.preventDefault();
        axios.delete("http://localhost:4000/api/repository/" + workspace + "/" + repo_slug +"/")
        .then((resp) => {
                console.log("delete");
                setDel((prev) => !prev);
        });
    }

    return (
        <Link
            className="bg-primary hover:bg-backgroundHover cursor-pointer rounded-0.938 py-3 px-4 w-full"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            to={"/repository/" + id}
        >
            <div className="flex justify-between">
                <h6 className="text-white ">{name}</h6>
                <h6 className="text-unclicked">
                    Owner: <span className="text-onlineGreen">{owner}</span>
                </h6>
            </div>
            <p className="text-unclicked text-sm mt-2">{description}</p>
            <div className="flex mt-4 justify-between">
                <Commit lastedit={lastEdit} />
                <h6
                    onClick={removeRepository}
                    className={`text-unclicked hover:text-white font-semi text-2xl transition eae-in-out duration-300 cursor-pointer ${
                        !hover ? " opacity-0" : ""
                    }`}
                >
                    x
                </h6>
            </div>
        </Link>
    );
}
