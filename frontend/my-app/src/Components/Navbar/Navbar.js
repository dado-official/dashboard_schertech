import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar({ setOpenSidebar }) {
    return (
        <div className=" bg-hover rounded-b-0.938 flex justify-end py-4 px-8 lg:hidden fixed top-0 left-0 w-full">
            <div
                className="cursor-pointer"
                onClick={() => setOpenSidebar(true)}
            >
                <GiHamburgerMenu color="white" size="18" />
            </div>
        </div>
    );
}
