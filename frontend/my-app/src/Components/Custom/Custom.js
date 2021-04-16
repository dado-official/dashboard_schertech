import React, { useState, useEffect } from "react";

export default function Repository({ setUrl }) {
    const [name, setName] = useState("Repositoryname");
    const [owner, setOwner] = useState("Repo Owner");
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        setUrl("Custom");
    }, []);

    return (
        <div className="ml-16.625 pb-8">
            <div grid grid-flow-rows grid-cols-4 gap-8 mt-8>
                //add dings
            </div>
        </div>
    );
}
