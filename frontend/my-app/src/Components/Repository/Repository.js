import React, { useState, useEffect } from "react";
import { BiLockAlt } from "react-icons/bi";
import { BiLockOpenAlt } from "react-icons/bi";
import Insights from "./Insights";
import LatestCommits from "./LatestCommits";
import MostCommitsChart from "./MostCommitsChart";
import CommitsPerWeekChart from "./CommitsPerWeekChart";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Repository({ setUrl, props }) {
  const [name, setName] = useState("Repositoryname");
  const [data, setData] = useState([]);
  const [dataOfCommits, setDataOfCommits] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setUrl("Repository");
    axios
      .get("http://localhost:4000/api/repository/" + id + "/")
      .then((resp) => {
        setIsPrivate(resp.data.is_private);
        setName(resp.data.name);
        console.log(resp.data);

        axios
          .get(
            "http://localhost:4000/api/repository/" +
              resp.data.workspace +
              "/" +
              resp.data.repo_slug +
              "/"
          )
          .then((resp) => {
            setIsPrivate(resp.data.is_private);
            setData(resp.data);
            setDataOfCommits(resp.data.last_commits)
          });
      });
  }, []);

  return (
    <div className="main pb-8">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img
            src={data.avatar_link}
            alt="Repo photo"
            className="h-20 w-20 rounded-0.938"
          />
          <div>
            <h2 className={`text-white text-2xl font-medium`}>{name}</h2>
            <div className="flex items-center gap-1">
              {isPrivate ? (
                <BiLockAlt color="#94A3BC" size="14" />
              ) : (
                <BiLockOpenAlt color="#94A3BC" />
              )}
              <p className=" text-unclicked text-sm">
                {isPrivate ? "Private" : "Public"}
              </p>
            </div>
          </div>
        </div>
        <button className="bg-commitBlue hover:bg-commitBlueHover transition ease-in-out duration-300 px-4 py-2 text-white rounded-0.938 h-minContent">
          Go to Repository
        </button>
      </div>
      <div className="flex w-full">
        <div className="grid grid-flow-rows grid-cols-4 gap-8 mt-8 w-full">
          <LatestCommits 
            last_commits={dataOfCommits} 
            number_of_commits={dataOfCommits.commit_number}
          />
          <div className="flex flex-col gap-8 col-span-2">
            <MostCommitsChart />
            <CommitsPerWeekChart />
          </div>
          <Insights
            created_on={data.created_on}
            last_updated_date={data.last_updated_formatted}
            owner={data.owner_name}
            branches={data.branch_number}
          />
        </div>
      </div>
    </div>
  );
}
