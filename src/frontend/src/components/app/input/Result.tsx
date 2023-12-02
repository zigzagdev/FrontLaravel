import React, {useState, useEffect} from "react";
import axios from "axios";
import Search from "./Search";
import {Link} from "react-router-dom";

type searchResults = {
    Id: number,
    itemName: string,
    content: string,
    price: number,
    categoryName: string
}

export function Result() {
    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("q")
    const [searchContents, setSearchContents] = useState<searchResults[]>([]);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        axios.get(`${baseURL}./search?q=${query}`)
            .then(res => {
                setSearchContents(res.data.data.itemInformation)
            })
    }, [])
    return (
        <>
            <div className="my-3 text-center block text-sm text-gray-300 sm:text-center
                           duration-700 hover:text-gray-100">
                <Search/>
            </div>
            <div className="my-24 mx-16">
                {searchContents.map(searchContent => {
                    return (
                        <Link to="" key={searchContent.Id}>
                            <div className="my-8 mx-5 inline-block max-w-sm w-full lg:max-w-full lg:flex">
                                <div
                                    className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400
                                bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col
                                justify-between leading-normal"
                                >
                                    <div className="mb-8">
                                        <div className="text-black">
                                            {searchContent.itemName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
