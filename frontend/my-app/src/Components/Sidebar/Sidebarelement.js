import React from 'react'

export default function Sidebarelement(props) {

    return (
        <div className="
                rounded-0.938
                pt-0.688
                pb-0.688
                pl-1
                flex flex-row content-evenly items-center
                bg-primary
                hover:bg-hover">

            {props.icon}
            <p className=" pl-1 align-middle font-monserrat text-white">{props.title}</p>
        </div>
    )
}
