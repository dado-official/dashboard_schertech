import React from 'react'

export default function Sidebarelement(props) {

    return (
        <div className="
                rounded-0.938
                pt-0.688
                pb-0.688
                pl-1.131
                flex flex-row content-evenly items-center
                font-monserrat 
                text-unclicked
                bg-primary
                hover:bg-hover
                focus:text-white">

            {props.icon}
            <p className=" pl-1 align-middle">{props.title}</p>
        </div>
    )
}
