import React, {useState, useEffect} from "react";
import axios from "axios";
import Search from "../input/Search";
import {Link} from "react-router-dom";

type itemsData = {
    Id: number,
    itemName: string,
    content: string,
    price: number,
    category: string,
    slug: string,
    perPage: number,
    adminId: number
}

type paginationData = {
    perPage: number,
    currentPage: number,
    from: number,
    to: number,
    lastPage: number,
    total: number
}


export function Items() {
    const [items, setItems] = useState<itemsData[]>([]);
    const [paginationData, setPaginationData] = useState<paginationData>(({
        perPage: 0,
        currentPage: 0,
        from: 0,
        to: 0,
        lastPage: 0,
        total: 0
    }));
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        axios.get(`${baseURL}./items`)
            .then(res => {
                setItems(res.data.data.itemDetail)
                setPaginationData(res.data.data.pagination)
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
                {items.map((item) => {
                    return (
                        <Link to={`${item.adminId}/Item/${item.slug}`} state={{slug: item.slug}} key={item.Id}>
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