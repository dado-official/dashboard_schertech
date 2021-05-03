import React, { useEffect, useState } from "react";
import Input from "../Shared/Input";
import TextArea from "../Shared/TextArea";
import axios from "axios";

const AddRepository = ({ setIsPopover, isPopover, setUpdate }) => {
    const [reponame, setReponame] = useState("");
    const [workspace, setWorkspace] = useState("");
    const [reposlug, setReposlug] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    function subm() {
        if (!/\S/.test(reponame)) {
            setError("Enter a Repository name");
        } else if (!/\S/.test(workspace)) {
            setError("Enter a workspace");
        } else if (!/\S/.test(reposlug)) {
            setError("Enter a reposlug");
        } else {
            let data = {
                workspace: workspace,
                repo_slug: reposlug,
                name: reponame,
                description: description,
            };

            axios
                .post("http://localhost:4000/api/repository", data)
                .then((res) => {
                    setIsPopover(false);
                    setUpdate((prev) => !prev);
                });
        }
    }

    return (
        <div
            className={`bg-input rounded-0.938 w-26 p-8 z-10 absolute right-0 top-14 border-onlineGreen border-4 ${
                isPopover ? "popover" : "popoverLeave"
            }`}
        >
            <p className="text-white mb-5 text-xl">Add Repository</p>
            <div className="flex gap-4">
                <div className="w-full">
                    <p className=" text-white text-sm">Repository Name</p>
                    <Input state={reponame} setState={setReponame}></Input>
                </div>
                <div className="w-full">
                    <p className=" text-white text-sm">Workspace</p>
                    <Input state={workspace} setState={setWorkspace}></Input>
                </div>
            </div>

            <p className=" text-white text-sm">Repo slug</p>
            <Input state={reposlug} setState={setReposlug}></Input>

            <p className=" text-white text-sm">Description</p>
            <TextArea state={description} setState={setDescription}></TextArea>

            <p className="text-offlineRed mb-5">{error}</p>

            <button
                onClick={subm}
                className="focus:outline-none bg-onlineGreen rounded-0.625 py-2 px-8 text-center text-black font-medium"
            >
                Add Repository
            </button>
        </div>
    );
};

export default AddRepository;
