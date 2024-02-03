import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import AdminHeader from "../../common/header/AdminHeader";
import {BASE_URL} from "../../common/Const";


type Inputs = {
    email: string,
    password: string
}

export function AdminLogin() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors},} = useForm<Inputs>()
    const showPassword = () => {
        setVisiblePassword((prevState) => !prevState);
    }
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios
            .post(`${BASE_URL}admin/login`, data)
            .then((res) => {
                const id = res.data.data.id
                return (
                    navigate(`/Admin/${id}/Profile`)
                )
            })
            .catch((error: any) => {
                if (error.response.statusText !== null) {
                    setError('Email or Password is wrong ...');
                    return (
                        navigate(`/Admin/Login`)
                    )
                } else {
                    setError('Internal server error is happened. Please do it again.');
                    return (
                        navigate(`/Admin/Login`)
                    )
                }
            });
    }
    return (
        <>
            <AdminHeader/>
            <div className="flex justify-center">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="my-5">
                            <strong className="text-red-600">Welcome Back !!</strong>
                        </h1>
                        <div className="">
                            <label htmlFor="email" className="float-left mx-10">Email address</label>
                            <input
                                autoComplete="email"
                                type="email"
                                className=""
                                placeholder="Enter your mail"
                                {...register("email", {required: true, minLength: 4})}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email?.type === "required" && (
                                <span role="alert" className="text-red-400">Email is required</span>
                            )}
                            {errors.email && errors.email.type === "minLength" && (
                                <span className="text-blue-700">Min length exceeded</span>
                            )}
                        </div>
                        <div className="flex my-4">
                            <label htmlFor="password" className="float-left mx-10">Password</label>
                            <input
                                autoComplete="password"
                                {...register("password", {required: true, minLength: 8})}
                                className="flex"
                                placeholder="Enter your password"
                                type={visiblePassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="mx-1" onClick={showPassword}>show password</span>
                            {errors.password?.type === "required" && (
                                <span role="alert" className="text-red-400">Password is required</span>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <span className="text-blue-700">Min length exceeded</span>
                            )}
                        </div>
                        <div className="flex my-4">
                            <button
                                className="btn btn-outline-primary text-center shadow-none mb-3 my-4"
                                type="submit"
                            >
                                Log in
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
            </div>
        </>
    )
}
