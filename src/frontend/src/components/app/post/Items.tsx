import React, {useState, useEffect} from "react";
import axios from "axios";
import Search from "../input/Search";
import {Link} from "react-router-dom";
import {Pagination} from "../input/Result";

type itemsData = {
    Id: number,
    itemName: string,
    content: string,
    price: number,
    category: string,
    slug: string
}

type pagination = {
    total: number,
    perPage: number,
    currentPage: number,
    from: number,
    to: number,
    lastPage: number
}

export function Posts() {
    const [items, setItems] = useState<itemsData[]>([]);
    const [pagination, setPagination] = useState<pagination>(({
        total: 0,
        perPage: 0,
        currentPage: 0,
        from: 0,
        to: 0,
        lastPage: 0
    }));
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(pagination.lastPage);
    console.log(lastPage)
    useEffect(() => {
        axios.get(`${baseURL}./items?page=${page}`)
            .then(res => {
                setItems(res.data.data.itemDetail)
                setPagination(res.data.data.pagination)
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
                        <Link to={`/Post/${item.slug}`} state={{slug: item.slug}} key={item.Id}>
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