import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import {Genre} from "./Genre";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import {BASE_URL} from "../../common/Const";
import {AxiosErrorResponse} from "../../common/types/Interface";

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

type Item = {
    id: number,
    name: string,
    content: string,
    price: number,
    slug: string,
    category: number,
    categoryName: string,
}

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
    useEffect(() => {
        axios.get(`${BASE_URL}admin/${id}/item/${slug}`)
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
    const id = item.adminId
    const {register, handleSubmit, formState: {errors}} = useForm<adminItem>();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${BASE_URL}admin/${id}/item/${slug}`)
            .then(res => {
                setItem(res.data.data.profile)
            })
    }, [])

    const onSubmit: SubmitHandler<adminItem> = (data: adminItem) => {
        axios
            .put<Item>(`${BASE_URL}admin/${id}/item/${slug}/update`, {
                id: item.id,
                name: data.name,
                content: data.content,
                price: data.price,
                category: data.categoryName,
                slug: data.slug,
                adminId: item.adminId
            })
            .then((res) => {
                return (
                    navigate('/')
                )
            })
            .catch((error) => {
                if (
                    (error as AxiosError<AxiosErrorResponse>).response ||
                    (error as AxiosError<AxiosErrorResponse>).response!.status === 400
                ) {
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
                                    {...register("content", {required: true, minLength: 4})}
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
    const {slug} = useParams<{ slug: string }>();
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
        axios.get(`${BASE_URL}item/${slug}`)
            .then(res => {
                setItem(res.data.data.profile)
            })
    }, [])
    console.log(item)
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
                        <p className="mx-7">{Genre[item.category].label}</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}