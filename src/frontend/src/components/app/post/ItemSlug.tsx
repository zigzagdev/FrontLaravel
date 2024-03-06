import React, {useEffect, useState} from "react";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {useParams, useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import {Genre} from "./Genre";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import {getSingleNoteFn} from "../../../config/common/Function";

type adminItem = {
    id: number,
    name: string,
    content: string,
    price: number,
    slug: string,
    adminId: number,
    category: number,
    categoryName: string,
}

export interface Item {
    id: number,
    name?: string,
    content: string,
    price: number,
    slug?: string,
    category: number,
    categoryName: string,
}

// export type INotesResponse = {
//     status: string;
//     results: number;
//     items: INote[];
// };

export function ShowSlug() {
    const {slug} = useParams<{ slug: string }>();
    const {id} = useParams<{ id: string }>();
    const [item, setItem] = useState<adminItem>(({
        id: 0,
        name: "",
        content: "",
        price: 0,
        slug: "",
        adminId: 0,
        category: 0,
        categoryName: "",
    }));
    // useEffect(() => {
    //     axios.get(`${BASE_URL}admin/${id}/item/${slug}`)
    //         .then(res => {
    //             setItem(res.data.data.itemInformation)
    //         })
    // }, [])
    return (
        <>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div className="my-3 mx-4">
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Name</p>
                        <p className="mx-7">{item.name}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Content</p>
                        <p className="mx-7">{item.content}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Price</p>
                        <p className="mx-7">{item.price}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Category</p>
                        <p className="mx-7">{item.category}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export function DeleteSlug() {
    const [error, setError] = useState(false);
    const {slug} = useParams<{ slug: string }>();
    return (
        <>
            <div>

            </div>
        </>
    )
}

export function ItemDisplay() {
    const {slug} = useParams<{slug: any}>();
    const [item, setItem] = useState<Item>(({
        id: 0,
        name: "",
        content: "",
        price: 0,
        slug: "",
        category: 0,
        categoryName: "",
    }));
    useEffect(() => {
       getSingleNoteFn(slug)
           .then((result:any) => {
               setItem(result.data.itemInformation)
           })
    }, []);
    return (
        <>
            <Header/>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div className="my-3 mx-4">
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Name</p>
                        <p className="mx-7">{item.name}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Content</p>
                        <p className="mx-7">{item.content}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Price</p>
                        <p className="mx-7">{item.price}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Category</p>
                        <p className="mx-7">{item.category}</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}