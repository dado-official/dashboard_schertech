import React from 'react'

export default function Sidebarelement(props) {
    const icon = props.icon;
    const title = props.title;

    return (
        <li>
            <icon/>
            <p>{title}</p>
        </li>
    )
}
