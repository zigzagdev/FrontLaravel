import React, {useState, useEffect} from "react";
import axios, {AxiosError} from "axios";
import Search from "../input/Search";
import {Link} from "react-router-dom";
import {Pagination} from "../config/Pagination";

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
    current_page: number,
    from: number,
    to: number,
    last_page: number,
}

type url = {
    next: string,
    prev: string,
}

type AxiosErrorResponse = {
    error: string
}

export function Items() {
    const [errorMessage, setErrorMessage] = useState('');
    const [items, setItems] = useState<itemsData[]>([]);
    const [paginationData, setPaginationData] = useState<paginationData>(({
        current_page: 1,
        from: 0,
        to: 0,
        last_page: 0,
    }));
    const [url, setUrl] = useState<url>(({
        next: '',
        prev: '',
    }));
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const pageNumbers = [];
    for (let i = 1; i <= paginationData.last_page; i++) {
        pageNumbers.push(i);
    }
    console.log(paginationData)
    let apiUrl = `${baseURL}items?`;
    const fetchItemData = (apiUrl: string) => {
        axios
            .get(apiUrl)
            .then((data) => {
                setItems(data.data.data.itemDetail);
                setPaginationData(data.data.meta);
                setUrl(data.data.links);
            })
            .catch((error) => {
                if (
                    (error as AxiosError<AxiosErrorResponse>).response &&
                    (error as AxiosError<AxiosErrorResponse>).response!.status === 400
                ) {
                    setErrorMessage('Something is wrong ....')
                }
            });
    };
    useEffect(() => {
        fetchItemData(apiUrl);
    }, []);
    console.log(apiUrl)
    return (
        <>
            <div
                className="my-3 text-center block text-sm text-gray-300 sm:text-center
                           duration-700 hover:text-gray-100">
                <Search/>
            </div>
            <div className="my-1">
                <span className="text-red-400">{errorMessage}</span>
            </div>
            <div className="my-24 mx-16">
                {items.map((item) => {
                    return (
                        <Link to={`${item.adminId}/Item/${item.slug}`} state={{slug: item.slug}} key={item.Id}>
                            <div className="my-8 mx-5 inline-block max-w-sm w-full lg:max-w-full lg:flex">
                                <div
                                    className="border-r border-b border-l border-gray-400 lg:border-l-0
                                    lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none
                                    lg:rounded-r p-4 flex flex-col justify-between leading-normal"
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
                <div className="my-3 mx-5">
                    <Pagination
                        currentPage={paginationData.current_page}
                        lastPage={paginationData.last_page}
                        from={paginationData.from}
                        next={url.next}
                        prev={url.prev}
                        apiUrl={apiUrl}
                        fetchItemData={fetchItemData}
                    />
                </div>
            </div>
        </>
    )
}
