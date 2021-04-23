import React, { useEffect, useState } from "react";
import Input from "../Shared/Input";
import TextArea from "../Shared/TextArea";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const AddRepository = ({ setIsPopover, isPopover }) => {
    const [reponame, setReponame] = useState("");
    const [workspace, setWorkspace] = useState("");
    const [reposlug, setReposlug] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    function subm() {
        let data = {
            workspace: workspace,
            repo_slug: reposlug,
            name: reponame,
            description: description,
        };

        axios.post("http://localhost:4000/api/repository", data).then((res) => {
            history.push("/repository");
        });
    }

    return (
        <div
            className={`bg-input rounded-0.938 w-26 p-12 z-10 absolute right-0 top-14 border-onlineGreen border-4 ${
                isPopover ? "" : "hidden"
            }`}
        >
            <p className="text-white mb-5 text-xl">Add Repository</p>
            <p className=" text-white text-xs ">Repository Name</p>
            <Input state={reponame} setState={setReponame}></Input>
            <p className=" text-white text-xs ">Workspace</p>
            <Input state={workspace} setState={setWorkspace}></Input>
            <p className=" text-white text-xs ">Repo slug</p>
            <Input state={reposlug} setState={setReposlug}></Input>
            <p className=" text-white text-xs ">Description</p>
            <TextArea state={description} setState={setDescription}></TextArea>
            <button
                onClick={subm}
                className="focus:outline-none rounded-0.625 w-full py-2 px-2 text-center text-white bg-commitBlue mb-2.75"
            >
                Add Repository
            </button>
        </div>
    );
};

export default AddRepository;
