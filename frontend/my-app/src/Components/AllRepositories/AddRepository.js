import React, { useEffect, useState} from "react";
import Input from "../Shared/Input";
import TextArea from "../Shared/TextArea";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";


const AddRepository = () => {
    const [reponame, setReponame] = useState("");
    const [workspace, setWorkspace] = useState("");
    const [reposlug, setReposlug] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    function subm() {

        let data = {
            name: reponame,
            repo_slug: reposlug,
            workspace: workspace,
            description: description
        }

        axios.post("http://localhost:4000/api/repository", data).then((res) => { history.push("/repository")});
    }

    return (
        <div className="main h-full flex flex-wrap content-center">
            <div className=" bg-primary rounded-0.938 w-22.625  m-auto p-1.875 pt-2.75 ">
                <p className=" text-center text-white mb-2.813">
                    Add Repository
                </p>
                <p className=" text-white text-xs ">Repository Name</p>
                <Input state={reponame} setState={setReponame}></Input>
                <p className=" text-white text-xs ">Workspace</p>
                <Input state={workspace} setState={setWorkspace}></Input>
                <p className=" text-white text-xs ">Repo slug</p>
                <Input state={reposlug} setState={setReposlug}></Input>
                <p className=" text-white text-xs ">Description</p>
                <TextArea
                    state={description}
                    setState={setDescription}
                ></TextArea>
                <button
                    
                    onClick={subm}
                    className="focus:outline-none rounded-0.625 w-full py-2 px-2 text-center text-white bg-commitBlue mb-2.75"
                >
                    Add Repository
                </button>
            </div>
        </div>
    );
};

export default AddRepository;
