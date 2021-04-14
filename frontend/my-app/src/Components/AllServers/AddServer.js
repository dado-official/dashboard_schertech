import React from 'react';

const AddServer = () => {

    return (
        <div className="ml-14.625">
            <div className=" bg-primary rounded-0.938 w-22.625 h-35.063 m-auto p-1.875 pt-2.75">
                <p className=" text-center text-white mb-2.813">Add Server</p>
                <p className=" text-white text-xs ">Server Name</p>
                <input className=" transition duration-500 ease-in-out outline-none py-1 px-2 text-white bg-input w-full mb-5 mt-2 rounded-0.625 focus:shadow-focusAdd"></input>
                <p className=" text-white text-xs ">Location</p>
                <input className=" transition duration-500 ease-in-out outline-none py-1 px-2 text-white bg-input w-full mb-5 mt-2 rounded-0.625 focus:shadow-focusAdd"></input>
                <p className=" text-white text-xs ">IP Address</p>
                <input className=" transition duration-500 ease-in-out outline-none text-white py-1 px-2 bg-input w-full mb-5 mt-2 rounded-0.625 focus:shadow-focusAdd"></input>
                <p className=" text-white text-xs ">Description</p>
                <textarea className=" transition duration-500 ease-in-out resize-none mt-2 outline-none py-1 px-2 text-white bg-input w-full h-auto rounded-0.625 mb-7 focus:shadow-focusAdd"></textarea>
                <button className="focus:outline-none rounded-0.625 w-full py-2 text-center text-white bg-commitBlue mb-2.75">Add Server</button>
            </div>
        </div>
    );
};

export default AddServer;