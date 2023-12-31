import React, {useState, useEffect} from "react";
import axios from "axios";
import Search from "../input/Search";
import {Link, useNavigate} from "react-router-dom";
import {Pagination} from "../config/Pagination";
import {set} from "react-hook-form";

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
    per_page: number,
    current_page: number,
    from: number,
    to: number,
    last_page: number,
    total: number,
}

type url = {
    first: string,
    last: string,
    next: string,
    prev: string,
}

export function Items() {
    const [items, setItems] = useState<itemsData[]>([]);
    const [paginationData, setPaginationData] = useState<paginationData>(({
        per_page: 0,
        current_page: 1,
        from: 0,
        to: 0,
        last_page: 0,
        total: 0,
    }));
    const [url, setUrl] = useState<url>(({
        first: '',
        last: '',
        next: '',
        prev: '',
    }));
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const [current, setCurrent] = useState(1);
    let apiUrl = `${baseURL}items?page=${current}`;
    const fetchItemData = (apiUrl: string) => {
        axios
            .get(apiUrl)
            .then((data) => {
                setItems(data.data.data.itemDetail);
                setPaginationData(data.data.meta);
                setUrl(data.data.links);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchItemData(apiUrl);
    }, []);


    const handleNextPage = () => {
        fetchItemData(url.next);
        setCurrent(current + 1);
    };

    const handlePreviousPage = () => {
        fetchItemData(url.prev);
        window.scrollTo(0, 0);
        setCurrent(current -1 );
    };
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
                    <p className="text-violet-300 my-3">
                        <span className="text-blue-700 px-1">Page</span>
                        {current} / {paginationData.last_page}
                    </p>
                    <div className="mx-16 flex">
                        {current !== 1 ?
                            <button onClick={handlePreviousPage}
                                    className="focus:outline-none text-white bg-purple-700 hover:bg-yellow-300
                            focus:ring-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-400
                            dark:hover:bg-yellow-400 dark:focus:ring-yellow-400 mx-1"
                            >
                                Before
                            </button>
                            : <div className="Font"> &emsp; &emsp;</div>
                        }
                        {/*{pageNumbers.map((pageNum) => {*/}
                        {/*    return (*/}
                        {/*        <button*/}
                        {/*            key={pageNum}*/}
                        {/*            onClick={numberClick}*/}
                        {/*            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4*/}
                        {/*        focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600*/}
                        {/*        dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-1"*/}
                        {/*        >*/}
                        {/*            {pageNum}*/}
                        {/*        </button>*/}
                        {/*    )*/}
                        {/*})}*/}
                        {current !== paginationData.last_page ?
                            <button onClick={handleNextPage}
                                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
                            focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600
                            dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-1"
                            >
                                Next
                            </button>
                            : <div className="Font"> &emsp; &emsp;</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}