import React from "react";

export default function Cancel({ isOpen, setIsOpen, deleteHandler }) {
    return (
        <div
            className={`bg-input2 p-8 rounded-0.938 border-4 border-onlineGreen top-1/2 left-1/2 centerAbsolute flex justify-center items-center flex-col ${
                isOpen ? "fixed" : "hidden"
            }`}
        >
            <p className="text-white mb-4 text-center">
                Do you really want to delete this entry? You won't be able to
                undo it!
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-6 bg-light focus:outline-none outline-none rounded-0.625 font-medium text-black"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        setIsOpen(false);
                        deleteHandler();
                    }}
                    className="py-2 px-6 bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
