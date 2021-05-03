import React, { useState, useEffect } from "react";
import Input from "../Shared/Input";

export default function Settings({ setUrl }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setUrl("Settings");
    }, []);

    return (
        <div className="main mb-8">
            <h2 className={`text-white text-2xl font-medium`}>Settings</h2>
            <div className="mt-4 rounded-0.938 bg-primary enter p-5 pb-0 w-full md:w-1/2">
                <div>
                    <p className=" text-white">Bitbucket username</p>
                    <Input
                        type="text"
                        state={username}
                        setState={setUsername}
                    />
                </div>
                <div>
                    <p className=" text-white">Bitbucket app password</p>
                    <Input
                        type="password"
                        state={password}
                        setState={setPassword}
                    />
                </div>
                <button className="mb-5 h-minContent py-2 px-6 w-min bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black">
                    Save
                </button>
            </div>
        </div>
    );
}
