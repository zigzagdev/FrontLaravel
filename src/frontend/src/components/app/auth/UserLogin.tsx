import React, {useRef, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/Header";

type Inputs = {
    email: string,
    password: string
}

const baseURL = process.env.REACT_APP_API_BASE_URL;

export function UserLogin() {
    const [error, setError] = useState('');
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const navigate = useNavigate();
    const showPassword = () => {
        setVisiblePassword((prevState) => !prevState);
    }
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios
            .post(`${baseURL}/login`, data)
            .then((res) => {
                const id = res.data.data.id
                return (
                    navigate(`/User/${id}`)
                )
            })
            .catch((error: any) => {
                if (error.response.statusText === 'Bad Request') {
                    setError('Email or Password is wrong ...');
                    return (
                        navigate(`/Login`)
                    )
                } else if (error.response.statusText === 'Not Acceptable') {
                    setError('Email or Password is wrong... Please do it again');
                    return (
                        navigate(`/Login`)
                    )
                } else {
                    setError('Internal server error is happened. Please do it again.')
                    return (
                        navigate(`/Login`)
                    )
                }
            });
    }
    return (
        <>
            <Header/>
            <div className="my-10 mx-24 flex justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="my-5">
                        <strong className="text-red-600">Login</strong>
                    </h1>
                    <div className="my-6">
                        <div className="my-2">
                            <label htmlFor="email" className="">Email</label>
                        </div>
                        <div className="my-2">
                            <input
                                autoComplete="email"
                                type="email"
                                className="w-72 rounded-md h-8 text-black"
                                placeholder="Enter your mail"
                                {...register("email", {required: true, minLength: 4})}
                                ref={emailRef}
                            />
                            {errors.email?.type === "required" && (
                                <span role="alert" className="text-red-400">Email is required</span>
                            )}
                            {errors.email && errors.email.type === "minLength" && (
                                <span className="text-blue-700">Min length exceeded</span>
                            )}
                        </div>
                    </div>
                    <div className="mt-9 mb-5">
                        <div className="my-2">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="flex">
                            <input
                                autoComplete="password"
                                {...register("password", {required: true, minLength: 8})}
                                className="flex w-72 rounded-md h-8 text-black"
                                placeholder="Enter your password"
                                type={visiblePassword ? "text" : "password"}
                                ref={passRef}
                            />
                            <span onClick={showPassword} className="ml-3">
                                {visiblePassword ? "show" : "hidden"}
                            </span>
                            {errors.password?.type === "required" && (
                                <span role="alert" className="text-red-400">Password is required</span>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <span className="text-blue-700">Min length exceeded</span>
                            )}
                        </div>

                    </div>
                    <div className="text-right mb-5 mt-10">
                        <Link to="/Forget/Password" className="font-bold text-blue-500">
                            Forgot password ?
                        </Link>
                    </div>
                    <div className="">
                        <button
                            className="btn w-72 rounded-md h-8 bg-indigo-600"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                    {
                        <div className="my-5">
                            <span className="text-blue-400 text-lg">
                                {error}
                            </span>
                        </div>
                    }
                </form>
            </div>
            <Footer/>
        </>
    )
}