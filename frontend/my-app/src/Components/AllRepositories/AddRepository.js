import React,{useState} from 'react';
import Input from '../Shared/Input'
import TextArea from '../Shared/TextArea'

const AddRepository = () => {
    const [reponame, setReponame] = useState("")
    const [accesstoken, setAccesstoken] = useState("")
    const [desciption, setDescription] = useState("")

    function subm(){
        console.log("reponame: ", reponame)
        console.log("accesstoken: ", accesstoken)
        console.log("description: ", desciption)
    }

    return (
        <div className="ml-14.625 h-full flex flex-wrap content-center"> 
            <div className=" bg-primary rounded-0.938 w-22.625 h-30.563 m-auto p-1.875 pt-2.75 ">
                <p className=" text-center text-white mb-2.813">Add Repository</p>
                <p className=" text-white text-xs ">Repository Name</p>
                <Input state={reponame} setState={setReponame} ></Input>
                <p className=" text-white text-xs ">Access Token</p>
                <Input state={accesstoken} setState={setAccesstoken}></Input>
                <p className=" text-white text-xs ">Description</p>
                <TextArea state={desciption} setState={setDescription}></TextArea>
                <button onClick={subm} className="focus:outline-none rounded-0.625 w-full py-2 text-center text-white bg-commitBlue mb-2.75">Add Repository</button>
            </div>
        </div>
    );
};

export default AddRepository;