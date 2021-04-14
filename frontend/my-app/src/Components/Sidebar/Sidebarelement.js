import React from 'react'

export default function Sidebarelement(props) {

    return (
        <div onClick={() => props.setUrl(props.title)} className={` cursor-pointer rounded-0.938 pt-0.688 pb-0.688 pl-1.131 flex flex-row content-evenly items-center bg-primary ${props.url === props.title ? "text-white bg-hover" : "text-unclicked"}`}>
            {props.icon}
            <p className=" 
                    pl-1 
                    align-middle 
                    ">{props.title}</p>
        </div>
    )
}


/*
                rounded-0.938
                pt-0.688
                pb-0.688
                pl-1.131
                flex flex-row content-evenly items-center
                font-monserrat 
                bg-primary
*/