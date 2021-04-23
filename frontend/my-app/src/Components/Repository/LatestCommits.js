import React, {useEffect, useState} from "react";
import { FaHistory } from "react-icons/fa";
import Commit from "./Commit";
import { defaults } from "react-chartjs-2";
defaults.global.defaultFontFamily = "Montserrat";
defaults.global.defaultFontColor = "#94A3BC";

export default function LatestCommits({param}) {
    const [state, setstate] = useState([])


    useEffect(() => {
        console.log(param)
        setstate(param)
    }, [param])

    return (
        <div className="bg-primary w-full rounded-0.938 px-6 py-4">
            <div className="flex gap-2 items-center">
                <FaHistory color="white" />
                <h6 className="text-white font-medium">Latest commits</h6>
            </div>
            <div className=" overflow-auto">
            {state != null ? 
                state.map((element) => (
                      <Commit
                        message={element.message}
                        username={element.author_name}
                        date={element.date}
                        commitID={element.id}
                        hash={element.hash}
                        username_raw={element.author_raw}
                    />
                ))
                : <p>loading ...</p>
            }
            </div>
            
        </div>
    );
}