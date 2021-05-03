import React, { useState, useEffect } from "react";
import Input from "../Shared/Input";
import axios from "axios";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

export default function Settings({ setUrl }) {
    const [path, setPath] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [initialUsername, setInitialUsername] = useState("");
    const [initialPassword, setInitialPassword] = useState("");
    const [initialPath, setInitialPath] = useState("");

    useEffect(() => {
        setUrl("Settings");
        axios.get("http://localhost:4000/api/env").then((res) => {
            console.log(res.data);
            setUsername(res.data.BITBUCKET_USERNAME);
            setInitialUsername(res.data.BITBUCKET_USERNAME);
            setPassword(res.data.BITBUCKET_APP_PASSWORD);
            setInitialPassword(res.data.BITBUCKET_APP_PASSWORD);
            setPath(res.data["DB_PATH"]);
            setInitialPath(res.data["DB_PATH"]);
        });
    }, []);

    function showPasswordHandler() {
        setShowPassword((prev) => !prev);
    }

    function saveHandler() {
        if (initialPassword !== password) {
            setInitialPassword(password);
            axios
                .put("http://localhost:4000/api/env/BITBUCKET_APP_PASSWORD", {
                    value: password,
                })
                .then((res) => {
                    console.log(res.data);
                });
        }
        if (initialUsername !== username) {
            setInitialUsername(username);
            axios
                .put("http://localhost:4000/api/env/BITBUCKET_USERNAME", {
                    value: username,
                })
                .then((res) => {
                    console.log(res.data);
                });
        }
        if (initialPath !== path) {
            setInitialPath(path);
            axios
                .put(`http://localhost:4000/api/env/DB_PATH`, {
                    value: path,
                })
                .then((res) => {
                    console.log(res.data);
                });
        }
    }

    return (
        <div className="main mb-8">
            <h2 className={`text-white text-2xl font-medium`}>Settings</h2>
            <div className="mt-4 rounded-0.938 bg-primary enter p-5 pb-0 w-full md:w-1/2">
                <div>
                    <p className="text-white">DB_PATH</p>
                    <Input type="text" state={path} setState={setPath} />
                </div>
                <div>
                    <p className="text-white">BITBUCKET_USERNAME</p>
                    <Input
                        type="text"
                        state={username}
                        setState={setUsername}
                    />
                </div>
                <div>
                    <p className="text-white">BITBUCKET_APP_PASSWORD</p>
                    <Input
                        type={showPassword ? "text" : "password"}
                        state={password}
                        setState={setPassword}
                    />

                    <div className="flex gap-2 mb-5 items-center">
                        {!showPassword ? (
                            <BiHide
                                color="rgba(148, 163, 188)"
                                size="16"
                                className="cursor-pointer"
                                onClick={showPasswordHandler}
                            />
                        ) : (
                            <BiShow
                                color="rgba(148, 163, 188)"
                                size="16"
                                className="cursor-pointer"
                                onClick={showPasswordHandler}
                            />
                        )}
                        <p className=" text-unclicked text-sm">Show Password</p>
                    </div>
                </div>
                <button
                    onClick={saveHandler}
                    className="mb-5 h-minContent py-2 px-6 w-min bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
