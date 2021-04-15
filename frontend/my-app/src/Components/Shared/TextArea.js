import React from 'react';

const TextArea = (props) => {
    return (
        <textarea onChange={(e) => props.setState(e.target.value)} value={props.state} className=" text-sm transition duration-500 ease-in-out resize-none mt-2 outline-none py-1 px-2 text-white bg-input w-full h-5.063 rounded-0.625 mb-7 focus:shadow-focusAdd">
            
        </textarea>
    );
};

export default TextArea;