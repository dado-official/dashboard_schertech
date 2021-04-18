import React from "react";
import { HiTrendingUp } from "react-icons/hi";
import { HiTrendingDown } from "react-icons/hi";

export default function Progress({ isPositive, percentage }) {
    return (
        <div className="text-white rounded-0.938 bg-primary w-full px-6 py-4 h-minContent pb-6">
            <div className="flex items-center gap-2">
                {isPositive ? (
                    <HiTrendingUp color="white" size="20" />
                ) : (
                    <HiTrendingDown color="white" size="20" />
                )}
                <p className="font-medium">Progress</p>
            </div>
            <div className="w-full bg-hover py-6 rounded-0.938 mt-4">
                <h6
                    className={`font-medium text-2xl  text-center ${
                        isPositive ? "text-onlineGreen" : "text-offlineRed"
                    }`}
                >
                    {isPositive ? "+" : "-"} {percentage}%
                </h6>
                <p className="text-center text-unclicked mt-2">
                    since last time
                </p>
            </div>
        </div>
    );
}
