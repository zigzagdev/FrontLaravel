import React, {useState} from "react";
import {Link} from "react-router-dom";


export function AuthenticationComponents() {
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
                    <div className="flex justify-center">
                        <button onClick={SideBarOpen}
                                className=" w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                            Help & Settings
                        </button>
                    </div>
                ) : (
                    <div className="justify-center">
                        <div
                            className={`left-0 w-[15vw] bg-blue-600 text-white fixed h-full z-40
                             ease-in-out duration-300 ${isOpen ? "translate-x-0 " : "translate-x-full"}`}
                        >
                            <div className="my-5 flex">
                                <span className="text-gray-800 mx-auto font-bold">
                                    Profile Page
                                </span>
                            </div>
                            <div className="my-5 flex">
                                <span className="text-gray-800 mx-auto font-bold">
                                    Item Page
                                </span>
                            </div>
                            <div className="my-5 flex  text-center">
                                <span className="text-gray-800 mx-auto py-2 font-bold bg-pink-200 w-10/12 rounded-md">
                                Help & Settings
                                </span>
                            </div>
                            <div className="my-5 mx-7">
                                <div className="flex my-5">
                                    <button onClick={SideBarClose} className="w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                        Back to Previous
                                    </button>
                                </div>
                                <div className="flex my-5 text-center">
                                    <span className="w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                        Settings
                                    </span>
                                </div>
                                <div className="flex my-5 text-center">
                                    <span className="w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                        Sign Out
                                    </span>
                                </div>
                                <div className="flex my-5 text-center">
                                    <span className="w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                        Language
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export function ItemComponents() {
    const [isOpen, setIsOpen] = useState(false);
    const SideBarOpen = () => {
        setIsOpen(true);
    }
    const SideBarClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <div>
                <div>
                    {!isOpen ? (
                        <div className="flex justify-center">
                            <button onClick={SideBarOpen}
                                    className="bg-indigo-500 py-2 w-44
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                Registered Items
                            </button>
                        </div>
                    ) : (
                        <div
                            className={`left-0 w-[15vw] bg-blue-600  px-2 text-white fixed h-full z-40
                             ease-in-out duration-300 ${isOpen ? "translate-x-0 " : "translate-x-full"} `}
                        >
                            <div className="my-1">
                                <span className="text-gray-800">Help & Settings</span>
                            </div>
                            <div className="my-1">
                                <button>
                                    back
                                </button>
                            </div>
                            <div className="my-1">
                                <Link to="/Admin/Login">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export function ProfileComponents() {
    const [isOpen, setIsOpen] = useState(false);
    const SideBarOpen = () => {
        setIsOpen(true);
    }
    const SideBarClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <div>
                <div>
                    {!isOpen ? (
                        <div className="flex justify-center">
                            <button onClick={SideBarOpen}
                                    className=" w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                Admin Profile
                            </button>
                        </div>
                    ) : (
                        <div
                            className={`left-0 w-[15vw] bg-blue-600  px-2 text-white fixed h-full z-40
                             ease-in-out duration-300 ${isOpen ? "translate-x-0 " : "translate-x-full"}`}
                        >
                            <div className="my-1">
                                <span className="text-gray-800">Help & Settings</span>
                            </div>
                            <div className="my-1">
                                <button>
                                    back
                                </button>
                            </div>
                            <div className="my-1">
                                <Link to="/Admin/Login">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}