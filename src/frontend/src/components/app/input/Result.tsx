import React, {useState, useEffect} from "react";
import axios from "axios";

type searchResults = {
    Id: number,
    itemName: string,
    content: string,
    price: number,
    categoryName: string
}


export default function Result() {
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
                {searchContents.map(searchContent => {
                    return (
                        searchContent.itemName
                    )
                })}
            </div>
        </>
    )
}