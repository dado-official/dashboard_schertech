import React, { useEffect, useState } from "react";
import RepositoriesContaier from "./RepositoriesContainer";
import AddButton from "../Shared/AddButton";
import axios from 'axios'

export default function AllServers({ setUrl, props}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setUrl("Repository");
        axios.get("http://localhost:4000/api/repository").then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <div className="main">
            <h2 className={`text-white text-2xl font-medium`}>
                All Repositories
            </h2>
            <p className=" text-unclicked">All the current repositories</p>
            <div className="grid grid-flow-row responsiveGrid gap-8 mt-4">
                {data != [] ? data.map((element) => (
                    <RepositoriesContaier
                        name={element.name}
                        description={element.description}
                        workspace={element.workspace}
                        repo_slug={element.repo_slug}
                    />
                )):<br/>}
                <AddButton title="repository" />
            </div>
        </div>
    );
}
