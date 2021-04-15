import React,{useState} from 'react';
import Input from '../Shared/Input'
import TextArea from '../Shared/TextArea'

const AddServer = () => {
    const [serverName, setServerName] = useState("")
    const [location, setLocation] = useState("")
    const [ipAddress, setIpAddress] = useState("")
    const [desciption, setDescription] = useState("")

    function subm(){
        console.log("Server Name: ", serverName)
        console.log("Location: ", location)
        console.log("IP Address: ", ipAddress)
        console.log("Description: ", desciption)
    }

    return (
        <div className="ml-14.625 h-full flex flex-wrap content-center"> 
            <div className=" bg-primary rounded-0.938 w-22.625 h-35.063 m-auto p-1.875 pt-2.75 ">
                <p className=" text-center text-white mb-2.813">Add Server</p>
                <p className=" text-white text-xs ">Server Name</p>
                <Input state={serverName} setState={setServerName} ></Input>
                <p className=" text-white text-xs ">Location</p>
                <Input state={location} setState={setLocation}></Input>
                <p className=" text-white text-xs ">IP Address</p>
                <Input state={ipAddress} setState={setIpAddress}></Input>
                <p className=" text-white text-xs ">Description</p>
                <TextArea state={desciption} setState={setDescription}></TextArea>
                <button onClick={subm} className="focus:outline-none rounded-0.625 w-full py-2 text-center text-white bg-commitBlue mb-2.75">Add Server</button>
            </div>
        </div>
    );
};

export default AddServer;