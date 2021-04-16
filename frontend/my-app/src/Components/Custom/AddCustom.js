import React,{useState} from 'react';
import Input from '../Shared/Input'
import TextArea from '../Shared/TextArea'
import {RangeStepInput} from 'react-range-step-input'

const AddCustom = () => {
    const [customName, setCustomName] = useState("")
    const [interval, setInterval] = useState(1)
    const [desciption, setDescription] = useState("")

    function subm(){
        console.log("Custom Name: ", customName)
        console.log("Interval: ", interval)
        console.log("Description: ", desciption)
    }

    return (
        <div className="ml-14.625 h-full flex flex-wrap content-center"> 
            <div className=" bg-primary rounded-0.938 w-22.625 h-35.063 m-auto p-1.875 pt-2.75 ">
                <p className=" text-center text-white mb-2.813">Add Custom</p>
                <p className=" text-white text-xs ">Custom Name</p>
                <Input state={customName} setState={setCustomName} ></Input>
                <p className=" text-white text-xs ">Interval (days)</p>
                <RangeStepInput 
                    className="w-full"
                    min={1}
                    max={365}
                    step={1}
                    value={interval}
                    onChange={(event) => {setInterval(event.target.value)}}
                    >
                </RangeStepInput>
                <Input state={interval} setState={setInterval}>{interval}</Input>
                <p className=" text-white text-xs ">Description</p>
                <TextArea state={desciption} setState={setDescription}></TextArea>
                <button onClick={subm} className="focus:outline-none rounded-0.625 w-full py-2 text-center text-white bg-commitBlue mb-2.75">Add Custom</button>
            </div>
        </div>
    );
};

export default AddCustom;