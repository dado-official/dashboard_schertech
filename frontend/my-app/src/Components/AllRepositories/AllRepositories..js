import React, { useEffect, useState, useRef } from "react";
import RepositoriesContaier from "./RepositoriesContainer";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa";
import AddRepository from "./AddRepository";
import RepositoryNotReachableContainer from "./RepositoryNotReachableContainer";

export default function AllServers({ setUrl, props }) {
    const [data, setData] = useState([]);
    const [isPopover, setIsPopover] = useState(false);
    const [update, setUpdate] = useState(false);
    const [state, setState] = useState(false)

    const addServerRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (
                addServerRef.current &&
                !addServerRef.current.contains(e.target)
            ) {
                setIsPopover(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });


    useEffect(() => {
        setUrl("Repository");
        axios.get("http://localhost:4000/api/repository").then((res) => {
            setData(res.data);
        });
    }, [update]);

    async function checkConnection(workspace, repoSlug){
        let reach
        axios.get("http://localhost:4000/api/repository/" + workspace + "/" + repoSlug + "/menu")
        .then((res) => {
            reach = true;
        })    
        .catch((err) => {
            console.log(err.response.status)
            if(err.response.status !== 200){
                reach = false  
            }
            
        }).then(() => {
            return reach
        })        
        
    }

    return (
        <div className="main">
            <div className="relative flex justify-between items-baseline">
                <div>
                    <h2 className={`text-white text-2xl font-medium`}>
                        All Repositories
                    </h2>
                    <p className=" text-unclicked">
                        All the current repositories
                    </p>
                </div>
                <div ref={addServerRef}>
                    <button
                        onClick={() => {
                            setIsPopover((prev) => !prev);
                        }}
                        className="py-2 px-6 bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black"
                    >
                        <div className=" flex items-center gap-2">
                            Add Repository
                            <FaAngleDown color="black" size="18" />
                        </div>
                    </button>
                    <AddRepository
                        setIsPopover={setIsPopover}
                        isPopover={isPopover}
                        setUpdate={setUpdate}
                    />
                </div>
            </div>
            <div className="grid grid-flow-row responsiveGrid gap-8 mt-4">
                {data != []
                    ? data.map((element) => {
                        if(await checkConnection(element.workspace, element.repo_slug)){
                            console.log("reachable")
                            return <RepositoriesContaier
                                        name={element.name}
                                        description={element.description}
                                        workspace={element.workspace}
                                        repo_slug={element.repo_slug}
                                        id={element.id}
                                        setDel={setUpdate}
                                    />
                        } else {
                            console.log("unreachable")
                            return <RepositoryNotReachableContainer
                                        name={element.name}
                                        description={element.description}
                                        workspace={element.workspace}
                                        repo_slug={element.repo_slug}
                                        id={element.id}
                                        setDel={setUpdate}
                                    />
                        }
                    })
                    : null}
            </div>
        </div>
    );
}
