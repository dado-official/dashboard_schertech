import React, { useState } from "react";
import Input from "../Shared/Input";
import TextArea from "../Shared/TextArea";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddServer = ({ isPopover }) => {
    const [serverName, setServerName] = useState("");
    const [location, setLocation] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [desciption, setDescription] = useState("");
    const [port, setPort] = useState("");

    const history = useHistory();

    function subm() {
        console.log("Server Name: ", serverName);
        console.log("Location: ", location);
        console.log("IP Address: ", ipAddress);
        console.log("username: ", username);
        console.log("password: ", password);
        console.log("Description: ", desciption);
        axios
            .post("http://localhost:4000/api/server", {
                servername: serverName,
                hostname: ipAddress,
                description: desciption,
                db_password: password,
                db_username: username,
                location: location,
            })
            .then((res) => {
                console.log(res.data);
                history.push("/server");
            });
    }

    return (
        <div
            className={`bg-input rounded-0.938 w-1/2 p-12 absolute mb-8 right-0 left-0 top-8 m-auto ${
                isPopover ? "" : "hidden"
            }`}
        >
            <p className="text-white mb-5 text-xl">Add Server</p>

            <div className="flex gap-4">
                <div className="w-full">
                    <p className=" text-white text-sm ">Server Name</p>
                    <Input state={serverName} setState={setServerName}></Input>
                    <p className=" text-white text-sm ">Username</p>
                    <Input state={username} setState={setUsername}></Input>
                    <p className=" text-white text-sm ">Port</p>
                    <Input state={port} setState={setPort}></Input>
                </div>
                <div className="w-full">
                    <p className=" text-white text-sm ">IP Address</p>
                    <Input state={ipAddress} setState={setIpAddress}></Input>
                    <p className=" text-white text-sm ">Password</p>
                    <Input
                        type="password"
                        state={password}
                        setState={setPassword}
                    ></Input>
                    <p className=" text-white text-sm ">Location</p>
                    <Input state={location} setState={setLocation}></Input>
                </div>
            </div>

            <p className=" text-white text-sm">Description</p>
            <TextArea state={desciption} setState={setDescription}></TextArea>
            <button
                onClick={subm}
                className="focus:outline-none hover:bg-commitBlueHover rounded-0.625 py-2 px-8 text-center text-white bg-commitBlue"
            >
                Add Server
            </button>
        </div>
    );
};

export default AddServer;
