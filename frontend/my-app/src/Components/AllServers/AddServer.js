import React, { useState } from "react";
import Input from "../Shared/Input";
import TextArea from "../Shared/TextArea";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddServer = ({ setIsPopover, isPopover, setUpdate }) => {
    const [serverName, setServerName] = useState("");
    const [location, setLocation] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [port, setPort] = useState("3306");
    const [error, setError] = useState("");

    const history = useHistory();

    function subm() {
        console.log("Server Name: ", serverName);
        console.log("Location: ", location);
        console.log("IP Address: ", ipAddress);
        console.log("username: ", username);
        console.log("password: ", password);
        console.log("Description: ", description);
        if (!/\S/.test(serverName)) {
            setError("Enter a server name");
        } else if (!/\S/.test(ipAddress)) {
            setError("Enter a hostname");
        } else if (!/\S/.test(username)) {
            setError("Enter an username");
        } else if (!/\S/.test(port)) {
            setError("Enter a port");
        } else if (!isNumeric(port)) {
            setError("Port needs to be a number");
        } else {
            setIsPopover(false);
            axios
                .post("http://localhost:4000/api/server", {
                    server_name: serverName,
                    hostname: ipAddress,
                    description: description,
                    db_password: password,
                    db_username: username,
                    location: location,
                    db_port: parseInt(port),
                })
                .then((res) => {
                    console.log(res.data);
                    setUpdate((prev) => !prev);
                });
        }
    }

    function isNumeric(num) {
        return !isNaN(num);
    }

    return (
        <div
            className={`bg-input rounded-0.938 w-26 p-8 z-10 absolute right-0 top-14 border-onlineGreen border-4 ${
                isPopover ? "popover" : "popoverLeave"
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
            <TextArea state={description} setState={setDescription}></TextArea>

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
