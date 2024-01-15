import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/Header";

type CreateUser = {
    name: string,
    email: string,
    password: string,
}


type UserData = {
    id: number,
    name: string,
    email: string,
}

type EmailData = {
    id: number,
    email: string,
}

type NameData = {
    id: number,
    name: string,
}

const baseURL = process.env.REACT_APP_API_BASE_URL;

export function CreateUser() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<CreateUser>()
    const onSubmit: SubmitHandler<CreateUser> = (data) => {
        axios
            .post(`${baseURL}./user/create`, data)
            .then((res) => {
                const {id} = res.data.data.profile
                return (
                    navigate(`/User/${id}`)
                )
            })
            .catch((error: any) => {
                if (error.res !== null) {
                    setError('User can not registered ...');
                    setTimeout("location.href='/Create'", 5000);
                } else {
                    setError('Internal server error is happened. Please do it again.');
                    setTimeout("location.href='/Create'", 5000);
                }
            });
    }
    return (
        <>
            <Header/>
            <div className="my-10 mx-9">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>Name</p>
                    <input
                        className="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg"
                        {...register("name", {required: true, minLength: 4, maxLength: 100})}
                        type="text"
                    />
                    {errors.name?.type === "required" && (
                        <p role="alert" className="text-red-400">ItemName is required</p>
                    )}
                    <p>Email</p>
                    <input
                        className="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg"
                        {...register("email", {
                            required: "required",
                            minLength: 4,
                            maxLength: 100,
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Entered value does not match email format",
                            },
                        })}
                        type="email"
                    />
                    {errors.email?.type === "pattern" && (
                        <p role="alert" className="text-red-400">{errors.email.message}</p>
                    )}
                    <p>Password</p>
                    <input
                        className="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg"
                        {...register("password", {required: true, minLength: 8, maxLength: 255})}
                        type="password"
                    />
                    <p role="alert" className="my-10 mx-5 text-red-600 font-mono text-lg">{error}</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer/>
        </>
    )
}

export function EachUserData() {
    const [error, setError] = useState("");
    const [userData, setUserData] = useState<UserData>({
        id: 0,
        email: '',
        name: ''
    });
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`${baseURL}./user/${id}`)
            .then(res => {
                setUserData(res.data.data.profile)
            })
            .catch((error: any) => {
                if (error.response.statusText == 'Bad Request') {
                    setError('Email or Password is wrong ...');
                    return (
                        navigate(`/Login`)
                    )
                } else {
                    setError('Internal server error is happened. Please do it again.');
                    return (
                        navigate(`/Login`)
                    )
                }
            })
    }, [])
    return (
        <>
            <Header/>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div>{userData.name}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                    <a href={`/User/` + id + `/Name`}>Name</a>
                </button>
            </div>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div>{userData.email}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                    <a href={`/User/` + id + `/Email`}>Email</a>
                </button>
            </div>
            <Footer/>
        </>
    )
}

export function EditUserName() {
    const [userName, setUserName] = useState<NameData>({
        id: 0,
        name: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<NameData>();
    const {id} = useParams<{ id: string }>();

    const onSubmit: SubmitHandler<NameData> = (data: NameData) => {
        axios
            .put<NameData>(`${baseURL}./user/${id}/update/name`, {
                name: userName.name,
            })
            .then((res) => {
                return (
                    navigate(`/User/${id}`)
                )
            })
            .catch((error: any) => {
                if (error.response.statusText == 'Bad Request') {
                    setError('Item Information could not updated ...');
                } else {
                    setError('Internal server error is happened. Please do it again.');
                }
            })
    };
    useEffect(() => {
        axios.get(`${baseURL}./user/${id}`)
            .then(res => {
                setUserName(res.data.data.profile)
            })
            .catch((error: any) => {
                if (error.response.statusText == 'Bad Request') {
                    setError('Item Information could not updated ...');
                } else {
                    setError('Internal server error is happened. Please do it again.');
                }
            })
    }, [])
    return (
        <>
            <Header/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4 mx-32 block text-lg duration-700">
                    <input
                        type="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        value={userName.name}
                        {...register("name", {required: true, minLength: 4, maxLength: 100})}
                        onChange={(e) => setUserName({...userName, name: e.target.value})}
                    />
                    {errors.name?.type === "required" && (
                        <p role="alert" className="text-red-300">User name is required</p>
                    )}
                    {errors.name && errors.name.type === "minLength" && (
                        <p role="alert" className="text-red-400">You need more than 4 characters.</p>
                    )}
                    {errors.name && errors.name.type === "maxLength" && (
                        <p role="alert" className="text-red-500">You have to written in less than 100 characters.</p>
                    )}
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
            <Footer/>
        </>
    )
}

export function EditUserEmail() {
    return (
        <>
            <div>
                email
            </div>
        </>
    )
}