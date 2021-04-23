import React, { useState } from "react";
import Input from "../Shared/Input";
import TextArea from "../Shared/TextArea";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddServer = ({ setIsPopover, isPopover }) => {
    const [serverName, setServerName] = useState("");
    const [location, setLocation] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [desciption, setDescription] = useState("");
    const [port, setPort] = useState("3006");
    const [error, setError] = useState("");

    const history = useHistory();

    function subm() {
        console.log("Server Name: ", serverName);
        console.log("Location: ", location);
        console.log("IP Address: ", ipAddress);
        console.log("username: ", username);
        console.log("password: ", password);
        console.log("Description: ", desciption);
        if (serverName === "" || serverName === " ") {
            setError("Enter a server name");
        } else if (ipAddress === "" || ipAddress === " ") {
            setError("Enter a hostname");
        } else if (username === "" || username === " ") {
            setError("Enter an username");
        } else if (port === "" || port === " ") {
            setError("Enter a port");
        } else if (!isNumeric(port)) {
            setError("Port needs to be a number");
        } else {
            setIsPopover(false);
            axios
                .post("http://localhost:4000/api/server", {
                    server_name: serverName,
                    hostname: ipAddress,
                    description: desciption,
                    db_password: password,
                    db_username: username,
                    location: location,
                    db_port: parseInt(port),
                })
                .then((res) => {
                    console.log(res.data);
                    history.push("/server");
                });
        }
    }

    function isNumeric(num) {
        return !isNaN(num);
    }

    return (
        <div
            className={`bg-input rounded-0.938 w-26 p-12 z-10 absolute right-0 top-14 border-onlineGreen border-4 ${
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
                    <p className=" text-white text-sm ">Hostname</p>
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

            <p className="text-offlineRed mb-5">{error}</p>

            <button
                onClick={subm}
                className="focus:outline-none bg-onlineGreen rounded-0.625 py-2 px-8 text-center text-black font-medium"
            >
                Add Server
            </button>
        </div>
    );
};

export default AddServer;
