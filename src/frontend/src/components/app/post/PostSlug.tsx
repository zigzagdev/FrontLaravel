import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

interface ItemInfo {
    id?: number,
    itemName?: string,
    content?: string,
    price?: number,
    categoryName?: string,
    slug?: string
}


export function PostSlug() {
    const {slug} = useParams<{slug: string}>();
    const [item, setItem] = useState<ItemInfo>();
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        axios.get(`${baseURL}./display/`+slug)
            .then(res => {
                setItem(res.data.data.profile)
            })
    }, [])
    console.log(item)
    return (
        <>
            {slug}
            <div>
                {item?.itemName}
            </div>

        </>
    )
}