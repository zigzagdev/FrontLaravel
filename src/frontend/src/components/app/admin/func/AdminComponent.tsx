import React, {useState} from "react";
import {AuthenticationComponents, ProfileComponents, ItemComponents} from "./SideBar";

export function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const SideBarOpen = () => {
        setIsOpen(true);
    }
    const SideBarClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <div className="">
                {!isOpen ? (
                    <div>
                        <svg
                            onClick={SideBarOpen}
                            className="fixed  z-30 flex items-center cursor-pointer left-2"
                            fill="#2563EB"
                            viewBox="0 0 100 80"
                            width="30"
                            height="40"
                        >
                            <rect width="100" height="10"></rect>
                            <rect y="30" width="100" height="10"></rect>
                            <rect y="60" width="100" height="10"></rect>
                        </svg>
                    </div>
                ) : (
                    <div
                        className={`left-0 w-[15vw] bg-blue-600  px-2 text-white fixed h-full z-40
                             ease-in-out duration-300 ${isOpen ? "translate-x-0 " : "translate-x-full"}`}
                    >
                        <div className="my-5 flex">
                            <button onClick={SideBarClose} className="mx-2">
                                ×
                            </button>
                        </div>
                        <div className="my-4 mx-3">
                            <div className="my-4 mx-3">
                                <AuthenticationComponents/>
                            </div>
                            <div className="my-4 mx-3">
                                <ProfileComponents/>
                            </div>
                            <div className="my-4 mx-3">
                                <ItemComponents/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}