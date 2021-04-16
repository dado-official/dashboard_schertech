import React, { useEffect } from "react";
import RepositoriesContaier from "./RepositoriesContainer";
import AddButton from "../Shared/AddButton";

export default function AllServers({ setUrl }) {
    useEffect(() => {
        setUrl("Repository");
    }, []);
    return (
        <div className="ml-16.625">
            <h2 className={`text-white text-2xl font-medium`}>
                All Repositories
            </h2>
            <p className=" text-unclicked">All the current repositories</p>
            <div className="grid grid-flow-row grid-cols-4 gap-8 mt-4">
                <RepositoriesContaier
                    name="Repository1"
                    description="Repository1 descritpion..."
                />
                <RepositoriesContaier
                    name="Repository1"
                    description="Repository1 descritpion..."
                />
                <RepositoriesContaier
                    name="Repository1"
                    description="Repository1 descritpion..."
                />
                <RepositoriesContaier
                    name="Repository1"
                    description="Repository1 descritpion..."
                />
                <RepositoriesContaier
                    name="Repository1"
                    description="Repository1 descritpion..."
                />
                <AddButton title="repository" />
            </div>
        </div>
    );
}
