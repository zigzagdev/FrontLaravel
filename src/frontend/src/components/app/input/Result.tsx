import React, {useState, useEffect} from "react";
import axios, {AxiosError} from "axios";
import Search from "./Search";
import {Link} from "react-router-dom";
import {Pagination} from "../config/Pagination";
import {BASE_URL} from "../../../config/const/Url";
import {PaginationData, Url} from "../../../config/common/Interface";

type SearchResults = {
    id: number,
    name: string,
    content: string,
    price: number,
    category: string
}

type AxiosErrorResponse = {
    error: string
}

export function Result() {
    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("q")
    const [errorMessage, setErrorMessage] = useState('');
    const [searchContents, setSearchContents] = useState<SearchResults[]>([]);
    const [paginationData, setPaginationData] = useState<PaginationData>(({
        current_page: 1,
        from: 0,
        last_page: 0,
    }));
    const [url, setUrl] = useState<Url>(({
        next: '',
        prev: '',
    }));

    let apiUrl = `${BASE_URL}search?q=${query}&`;
    const fetchItemData = (apiUrl: string) => {
        axios
            .get(apiUrl)
            .then((data) => {
                setSearchContents(data.data.data.itemInformation);
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
    return (
        <>
            <div className="my-3 text-center block text-sm text-gray-300 sm:text-center
                           duration-700 hover:text-gray-100">
                <Search/>
            </div>
            <div className="my-1">
                <span className="text-red-400">{errorMessage}</span>
            </div>
            <div className="my-24 mx-16">
                {searchContents.map(searchContent => {
                    return (
                        <Link to="" key={searchContent.id}>
                            <div className="my-8 mx-5 inline-block max-w-sm w-full lg:max-w-full lg:flex">
                                <div
                                    className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400
                                bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col
                                justify-between leading-normal"
                                >
                                    <div className="mb-8">
                                        <div className="text-black">
                                            {searchContent.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <Pagination
                currentPage={paginationData.current_page}
                lastPage={paginationData.last_page}
                from={paginationData.from}
                next={url.next}
                prev={url.prev}
                apiUrl={apiUrl}
                fetchItemData={fetchItemData}
            />
        </>
    )
}
