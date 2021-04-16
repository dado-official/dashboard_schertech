import React,{useState} from 'react';

const Input = (props) => {
    return (
        <input onChange={(e) => props.setState(e.target.value)} value={props.state} className=" text-sm transition duration-500 ease-in-out outline-none py-1 px-2 text-white bg-input w-full mb-5 mt-2 rounded-0.625 focus:shadow-focusAdd"></input>
    );
};

export default Input;