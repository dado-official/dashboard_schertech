import React from "react";
export default function Warning({
    waitTime,
    input,
    addHandler,
    isOpen,
    setIsOpen,
}) {
    return (
        <div
            className={`bg-input2 p-8 rounded-0.938 border-4 border-onlineGreen top-1/2 left-1/2 centerAbsolute flex justify-center items-center flex-col ${
                isOpen ? "fixed" : "hidden"
            }`}
        >
            <p className="text-white mb-4 text-center">
                According to your frequency your next entry would be in{" "}
                {waitTime}. Would you still like to add the Data?
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
                        addHandler();
                    }}
                    className="py-2 px-6 bg-onlineGreen focus:outline-none outline-none rounded-0.625 font-medium text-black"
                >
                    Add anyways
                </button>
            </div>
        </div>
    );
}
