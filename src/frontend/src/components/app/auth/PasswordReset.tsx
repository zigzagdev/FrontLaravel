import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {Link} from "react-router-dom";

type Email = {
    email: string
};

type Password = {
    password: string
}

export function ForgetPassword() {
    const [email, setEmail] = useState("");
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const {handleSubmit, register, formState: {errors}} = useForm<Email>()
    const onSubmit: SubmitHandler<Email> = (data) => {
        axios
            .post(`${baseURL}./`, data)
            .then((res) => {
                return (
                    <>

                    </>
                )
            })
            .catch((error: any) => {

            });
    }
    return (
        <>
            <div className="">
                <div className="h-screen flex">
                    <div className="w-2/5 bg-gray-200 justify-center items-center flex flex-col">
                        <div className="">
                            Whiskey Love
                        </div>
                        <div className="mt-4">
                            Enrich your daily life .
                        </div>
                    </div>
                    <div className="w-3/5 flex bg-white">
                        <div className="py-32 px-52">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="font-extrabold">Password Reset</div>
                                <div className="my-8">
                                    <div className="break-words">
                                        We will send you instructions to reset your password
                                        to the email address provided below.
                                        Please check your email and follow the reset instructions.
                                    </div>
                                    <div className="mt-12 mb-2 font-semibold">
                                        Email Address
                                    </div>
                                    <input
                                        type="email"
                                        className="peer h-full w-full rounded-[7px]  !border
                                    !border-gray-300 border-t-transparent bg-transparent bg-white
                                    px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700
                                    shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent
                                    transition-all placeholder:text-gray-400 pl-2 placeholder-shown:border
                                    placeholder-shown:border-blue-gray-100 placeholder-shown:border-t-blue-gray-200 focus:border-2
                                    focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900
                                    focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                                        {...register("email", {
                                            required: true
                                            , minLength: 4
                                            , maxLength: 100
                                            , pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                message: "Email must be in format : example@example.com",
                                            },
                                        })}
                                        placeholder="Enter your email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && errors.email.type === "maxLength" && (
                                        <span role="alert" className="text-red-500 pt-1 block">
                                            You have to written in less than 100 characters.
                                        </span>
                                    )}
                                    {errors.email && errors.email.type === "minLength" && (
                                        <span role="alert" className="text-red-400 pt-1 block">
                                            You have to written in more than 4 characters.
                                        </span>
                                    )}
                                    {errors.email && errors.email.type === "required" && (
                                        <span role="alert" className="text-red-300 pt-1 block">
                                            Email is required.
                                        </span>
                                    )}
                                    {errors.email && errors.email.type === "pattern" && (
                                        <span role="alert" className="text-red-300 pt-1 block">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700
                                               text-white font-bold py-2 px-4 rounded-md w-full"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                            <div className="py-5">
                                <Link to="/Login" className="text-violet-400 font-bold">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function ResetPassword() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const {handleSubmit, register, formState: {errors}} = useForm<Password>()
    return (
        <>
            <div className="">
                <div className="h-screen flex">
                    <div className="w-2/5 bg-gray-200 justify-center items-center flex flex-col">
                        <div className="">
                            Whiskey Love
                        </div>
                        <div className="mt-4">
                            Enrich your daily life .
                        </div>
                    </div>
                    <div className="w-3/5 flex bg-white">
                        <div className="py-32 px-52">
                            <form>
                                <div className="font-extrabold">Password Reset</div>
                                <div className="my-8">
                                    <div className="break-words">
                                        We will send you instructions to reset your password
                                        to the email address provided below.
                                        Please check your email and follow the reset instructions.
                                    </div>
                                    <div className="mt-12 mb-2 font-semibold">
                                        Password
                                    </div>
                                    <input
                                        type="email"
                                        className="peer h-full w-full rounded-[7px]  !border
                                    !border-gray-300 border-t-transparent bg-transparent bg-white
                                    px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700
                                    shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent
                                    transition-all placeholder:text-gray-400 pl-2 placeholder-shown:border
                                    placeholder-shown:border-blue-gray-100 placeholder-shown:border-t-blue-gray-200 focus:border-2
                                    focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900
                                    focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                                    />
                                </div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700
                                               text-white font-bold py-2 px-4 rounded-md w-full"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                            <div className="py-5">
                                <Link to="/Login" className="text-violet-400 font-bold">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}