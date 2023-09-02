import React, {useState, useEffect} from "react";
import axios from "axios";
import Search from "./app/input/Search";
import {Link} from "react-router-dom";

interface ItemInfo {
    id?: number,
    itemName?: string,
    content?: string,
    price?: number,
    categoryName?: string
}


export default function Index() {
    const [items, setItems] = useState<ItemInfo[]>([]);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        axios.get(`${baseURL}./items`)
            .then(res => {
                setItems(res.data.data.itemDetail)
            })
    }, [])
    return (
        <>
            <div
                className="my-3 text-center block text-sm text-gray-300 sm:text-center
                           duration-700 hover:text-gray-100">
                <Search/>
            </div>
            <div className="my-24 mx-16">
                {items.map(item => {
                    return (
                        <Link to={`/Posts/.${item.itemName}`}>
                        <div className="my-8 mx-5 inline-block max-w-sm w-full lg:max-w-full lg:flex">
                            <div
                                className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400
                                bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col
                                justify-between leading-normal"
                            >
                                <div className="mb-8">
                                    <div className="text-black">
                                        {item.itemName}
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