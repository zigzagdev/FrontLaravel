import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/Header";

type Inputs = {
    email: string,
    password: string
}

export function UserLogin() {
    const [error, setError] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const showPassword = () => {
        setVisiblePassword((prevState) => !prevState);
    }
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios
            .post(`${baseURL}./login`, data)
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
            <div className="my-5 mx-36">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="my-5">
                        <strong className="text-red-600">Login</strong>
                    </h1>
                    <div className="">
                        <label htmlFor="email" className="float-left mx-10">Email</label>
                        <input
                            autoComplete="email"
                            type="email"
                            className=""
                            placeholder="Enter your mail"
                            {...register("email", {required: true, minLength: 4})}
                        />
                        {errors.email?.type === "required" && (
                            <span role="alert" className="text-red-400">Email is required</span>
                        )}
                        {errors.email && errors.email.type === "minLength" && (
                            <span className="text-blue-700">Min length exceeded</span>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="password">Password</label>
                        <input
                            autoComplete="password"
                            {...register("password", {required: true, minLength: 8})}
                            className="flex"
                            placeholder="Enter your password"
                            type={visiblePassword ? "text" : "password"}
                        />
                        <span className="mx-1" onClick={showPassword}>show password</span>
                        {errors.password?.type === "required" && (
                            <span role="alert" className="text-red-400">Password is required</span>
                        )}
                        {errors.password && errors.password.type === "minLength" && (
                            <span className="text-blue-700">Min length exceeded</span>
                        )}
                    </div>
                    <p className="item">
                        <button
                            className="btn btn-outline-primary text-center shadow-none mb-3"
                            type="submit"
                        >
                            Submit
                        </button>
                    </p>
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