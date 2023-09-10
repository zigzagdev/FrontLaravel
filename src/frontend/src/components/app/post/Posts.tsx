import React, {useState, useEffect} from "react";

type ItemInfos = {
    id?: number,
    itemName?: string,
    content?: string,
    price?: number,
    category?: string,
    slug?: string
}

export function Posts() {
    const [items, setItems] = useState<ItemInfos[]>([]);
    return (
        <>
            Index
            <div className="my-4 mx-32 block text-lg
                           duration-700 hover:text-gray-100">
                Most read articles .
            </div>
        </>
    )
}