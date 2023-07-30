import React, {useState, useEffect} from "react";
import axios from "axios";
import Search from "./app/input/Search";

interface ItemInfo {
    id?: number,
    itemName?: string,
    content?: string,
    price?: number,
    categoryName? : string
}


export default function Index() {
    const [items, setItems] = useState<ItemInfo[]>([]);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        axios.get(`${baseURL}./allItems`)
            .then(res => {
                setItems(res.data.data.itemDetail)
            })
    }, [])
    return (
        <>
            <div className="my-3 block text-sm text-gray-300 duration-700 hover:text-gray-100">
                <Search/>
            </div>
            <div>
                {items.map(item => {
                    return(
                        item.itemName
                    )
                })}
            </div>
        </>
    )
}

