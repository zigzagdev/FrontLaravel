import React, {useState, useEffect} from "react";
import axios from "axios";

interface searchResults {
    id?: number,
    itemName?: string,
    content?: string,
    price?: number,
    categoryName?: string
}


export default function Result() {
    const [searchContents, setSearchContents] = useState<searchResults[]>([]);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        axios.get(`${baseURL}./search?q=${searchContents}`)
            .then(res => {
                setSearchContents(res.data.data.itemInformation)
            })
    }, [])

    return (
        <>
            <div>
                {searchContents.map(searchContent => {
                    return (
                        searchContent.itemName
                    )
                })}
            </div>
        </>
    )
}