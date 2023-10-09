import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import {Genre} from "./Genre";

type item = {
    id: number,
    name: string,
    description: string,
    content: string,
    price: number,
    categoryName: string,
    category: number,
    slug: string,
    admin_id: number
}


export function ShowSlug() {
    const {slug} = useParams<{ slug: string }>()
    const [item, setItem] = useState<item>({
        id: 0,
        name: "",
        description: "",
        content: "",
        price: 0,
        categoryName: "",
        category: 0,
        slug: "",
        admin_id: 0
    });
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        axios.get(`${baseURL}./display/` + slug)
            .then(res => {
                setItem(res.data.data.profile)
            })
    }, [])

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
                        <p className="mx-7">{Genre[item.category].label}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export function EditSlug() {
    const {slug} = useParams<{ slug: string }>();
    const [error, setError] = useState('');
    const [item, setItem] = useState<item>(({
        id: 0,
        name: "",
        content: "",
        description: "",
        price: 0,
        category: 0,
        categoryName: "",
        slug: "",
        admin_id: 0
    }));
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<item>()

    useEffect(() => {
        axios.get(`${baseURL}./display/` + slug)
            .then(res => {
                setItem(res.data.data.profile)
            })
    }, [])

    const onSubmit: SubmitHandler<item> = (data: item) => {
        axios
            .put<item>(`${baseURL}./update/` + slug, {
                id: item.id,
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.categoryName,
                slug: data.slug,
                admin_id: item.admin_id
            })
            .then((res) => {
                return (
                    navigate('/')
                )
            })
            .catch((error: any) => {
                if (error.response.statusText == 'Bad Request') {
                    setError('Item Information could not updated ...');
                } else {
                    setError('Internal server error is happened. Please do it again.');
                }
            });
    }
    return (
        <>
            <div className="my-6 mx-7 text-center block text-m  sm:text-center duration-700 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-3 mx-4">
                        <div className="my-5">
                            <p className="item">
                                <label htmlFor="itemName" className="mx-4">ItemName</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("name", {required: true, minLength: 4})}
                                />
                                {errors.name?.type === "required" && (
                                    <p role="alert" className="text-red-400">ItemName is required</p>
                                )}
                                {errors.name && errors.name.type === "minLength" && (
                                    <p role="alert" className="text-red-400">Min length exceeded</p>
                                )}
                            </p>
                            {errors.name && errors.name.type === "maxLength" && (
                                <span
                                    className="text-red-400 my-1 mx-2 text-md"
                                >
                                Item name must be within 200 characters.
                            </span>
                            )}
                        </div>
                        <div className="my-5">
                            <p className="my-3 mx-4">Item Content</p>
                            <p className="mx-7">
                                <label htmlFor="description" className="mx-4">ItemContent</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("description", {required: true, minLength: 4})}
                                />
                            </p>
                        </div>
                        <div className="my-5">
                            <p className="my-3 mx-4">Item Price</p>
                            <p className="mx-7">
                                <label htmlFor="price" className="mx-4">ItemPrice</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("price", {required: true})}
                                />
                            </p>
                        </div>
                        <div className="my-5">
                            <p className="my-3 mx-4">Item Category</p>
                        </div>
                        <select id="genre" {...register("categoryName")}>
                            <option className="text-black">選択してください</option>
                            {Genre.map((genre) => (
                                <option value={genre.id} key={genre.id}>{genre.label}</option>
                            ))}
                        </select>
                        <div className="my-10 mx-5 text-red-600 font-mono text-lg">
                            {error}
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

// export function DeleteSlug() {
//     return (
//         <>
//             <div>
//
//             </div>
//         </>
//     )
// }