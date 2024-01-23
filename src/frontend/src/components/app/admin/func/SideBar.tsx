import React, {useState} from "react";

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
                    <div className="justify-center overflow-y-auto">
                        <div className="my-5 flex  text-center">
                                <span className="text-gray-800 mx-auto py-2 font-bold bg-pink-200 w-10/12 rounded-md">
                                Help & Settings
                                </span>
                        </div>
                        <div>
                            <div className="flex my-5">
                                <button onClick={SideBarClose} className="w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                    Close
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
            <div className="">
                {!isOpen ? (
                    <div className="flex justify-center">
                        <button onClick={SideBarOpen}
                                className=" w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                            Item Page
                        </button>
                    </div>
                ) : (
                    <div className="justify-center overflow-y-auto">
                        <div className="my-5">
                            <div className="my-5 flex  text-center">
                                <span className="text-gray-800 mx-auto py-2 font-bold bg-pink-200 w-full rounded-md">
                                    Item Page
                                </span>
                            </div>
                            <button onClick={SideBarClose} className="w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                Close
                            </button>
                            <div className="flex my-5 text-center">
                                    <span className="w-full py-2 bg-indigo-500
                                          hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                        Item Register
                                    </span>
                            </div>
                            <div className="flex my-5 text-center">
                                    <span className="w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                        All Registered Items
                                    </span>
                            </div>
                        </div>
                    </div>
                )}
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
            <div className="pb-12">
                {!isOpen ? (
                    <div className="flex justify-center">
                        <button onClick={SideBarOpen}
                                className=" w-full py-2 bg-indigo-500
                            hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                            Admin Profile
                        </button>
                    </div>
                ) : (
                    <div className="justify-center">
                        <div className="my-5 flex  text-center">
                                <span className="text-gray-800 mx-auto py-2 font-bold bg-pink-200 w-10/12 rounded-md">
                                    Admin Profile
                                </span>
                        </div>
                        <button onClick={SideBarClose}
                                className="w-full py-2 bg-indigo-500
                                hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                            Close
                        </button>
                        <div className=" overflow-y-auto">
                            <div className="flex my-5 text-center">
                                    <span className="w-full py-2 bg-indigo-500
                                          hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                        Name Change
                                    </span>
                            </div>
                            <div className="flex my-6 text-center">
                                <span className="w-full py-2 bg-indigo-500
                                          hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                    Email Change
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}