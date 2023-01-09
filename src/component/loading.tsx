import React from "react";

export default function Loading(){
    return(
        <div className="relative flex justify-center right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 h-4/5 ">
        <div
            className="border-t-transparent border-solid animate-spin  rounded-full border-b-emerald-800 border-8 h-52 w-52"></div>
    </div>)
}