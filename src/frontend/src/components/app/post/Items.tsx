import React, {useState, useEffect} from "react";
import axios, {AxiosError} from "axios";
import {Link} from "react-router-dom";
import {Pagination} from "../config/Pagination";
import {BASE_URL} from "../../common/Const";
import {PaginationData, Url, AxiosErrorResponse} from "../../common/types/Interface";
import Footer from "../../common/footer/Footer";

type ItemsData = {
    id: number,
    itemName: string,
    content: string,
    price: number,
    category: string,
    slug: string
}

export function Items() {
    const [errorMessage, setErrorMessage] = useState('');
    const [items, setItems] = useState<ItemsData[]>([]);
    const [paginationData, setPaginationData] = useState<PaginationData>(({
        current_page: 1,
        from: 0,
        last_page: 0,
    }));
    const [url, setUrl] = useState<Url>(({
        next: '',
        prev: '',
    }));
    const pageNumbers = [];
    for (let i = 1; i <= paginationData.last_page; i++) {
        pageNumbers.push(i);
    }
    let apiUrl = `${BASE_URL}items?`;
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
                    (error as AxiosError<AxiosErrorResponse>).response ||
                    (error as AxiosError<AxiosErrorResponse>).response!.status === 400
                ) {
                    setErrorMessage('Something is wrong ....')
                }
            });
    };
    console.log(items)
    useEffect(() => {
        fetchItemData(apiUrl);
    }, []);
    return (
        <>
            <div className="my-24 mx-16">
                {items.map((item) => {
                    return (
                        <Link to={`/Item/${item.slug}`} state={{slug: item.slug}} key={item.id}>
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
                {errorMessage}
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
            <Footer/>
        </>
    )
}
