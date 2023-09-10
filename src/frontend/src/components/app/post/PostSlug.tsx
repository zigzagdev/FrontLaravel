import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import {Genre} from "./Genre";

interface item {
    id: number,
    itemName: string,
    content: string,
    price: number,
    category: number,
    slug: string
}


export function ShowSlug() {
    const {slug} = useParams<{ slug: string }>()
    const [item, setItem] = useState<item>(({id: 0, itemName: "", content: "", price: 0, category: 0, slug: ""}));
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    console.log(Genre[item?.category].label);

    useEffect(() => {
        axios.get(`${baseURL}./display/` + slug)
            .then(res => {
                setItem(res.data.data.profile)
            })
    }, [])
    return (
        <>
            <div className="my-4 mx-32 block text-lg
                           duration-700">
                <div className="my-3 mx-4">
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Name</p>
                        <p className="mx-7">{item?.itemName}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Content</p>
                        <p className="mx-7">{item?.content}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Price</p>
                        <p className="mx-7">{item?.price}</p>
                    </div>
                    <div className="my-5">
                        <p className="my-3 mx-4">Item Category</p>
                        <p className="mx-7">
                            {Genre[item?.category].label}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export function EditSlug() {
    // const {slug} = useParams<{ slug: string }>();
    // const [error, setError] = useState('');
    // const [item, setItem] = useState<ItemInfo>();
    // const baseURL = process.env.REACT_APP_API_BASE_URL;
    // const navigate = useNavigate();
    // const {register, handleSubmit, formState: {errors}} = useForm<ItemInfo>()
    //
    // const onSubmit: SubmitHandler<ItemInfo> = (data) => {
    //     axios
    //         .put<ItemInfo>(`${baseURL}./display/` + slug, data)
    //         .then((res) => {
    //             return (
    //                 navigate(`${baseURL}./display/` + slug)
    //             )
    //         })
    //         .catch((error: any) => {
    //             if (error.response.statusText == 'Bad Request') {
    //                 setError('Item Information could not updated ...');
    //             } else {
    //                 setError('Internal server error is happened. Please do it again.');
    //             }
    //         });
    // }
    return (
        <>
            {/*<div className="my-3 text-center block text-m  sm:text-center*/}
            {/*               duration-700 ">*/}
            {/*    <form>*/}
            {/*        <div className="my-3 mx-4">*/}
            {/*            <div className="my-5">*/}
            {/*                <p className="my-3 mx-4">Item Name</p>*/}
            {/*                <p className="mx-7">*/}
            {/*                    <input*/}
            {/*                        {...register("itemName", {required: true, maxLength: 200})}*/}
            {/*                    />*/}
            {/*                </p>*/}
            {/*                {errors.itemName && errors.itemName.type === "maxLength" && (*/}
            {/*                    <span*/}
            {/*                        className="text-red-400 my-1 mx-2 text-md"*/}
            {/*                    >*/}
            {/*                    Item name must be within 200 characters.*/}
            {/*                </span>*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*            <div className="my-5">*/}
            {/*                <p className="my-3 mx-4">Item Content</p>*/}
            {/*                <p className="mx-7">{item?.content}</p>*/}
            {/*            </div>*/}
            {/*            <div className="my-5">*/}
            {/*                <p className="my-3 mx-4">Item Price</p>*/}
            {/*                <p className="mx-7">*/}
            {/*                    <input*/}
            {/*                        value={item?.price}*/}
            {/*                    />*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="my-5">*/}
            {/*                <p className="my-3 mx-4">Item Category</p>*/}
            {/*                <p className="mx-7 text-black">{item?.category}</p>*/}
            {/*            </div>*/}
            {/*            <select id="genre">*/}
            {/*                <option value="" selected className="text-black">選択してください</option>*/}
            {/*                {Genre.map((genre: Genre) => (*/}
            {/*                    <option value={genre.id}>{genre.label}</option>*/}
            {/*                ))}*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </>
    )
}

export function DeleteSlug() {
    return (
        <>
            <div>

            </div>
        </>
    )
}