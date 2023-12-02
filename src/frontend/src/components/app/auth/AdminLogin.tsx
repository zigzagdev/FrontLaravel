import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import AdminHeader from "../../common/header/AdminHeader";

type Inputs = {
    email: string,
    password: string
}

export function AdminLogin() {
    const [error, setError] = useState('');
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios
            .post(`${baseURL}./admin/login`, data)
            .then((res) => {
                const id = res.data.data.id
                return (
                    navigate(`/Admin/${id}/Profile`)
                )
            })
            .catch((error: any) => {
                if (error.response.statusText == 'Bad Request') {
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
            <div className="my-5 mx-36">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="my-5">
                        <strong className="text-red-600">Login</strong>
                    </h1>
                    <div className="flex my-4">
                        <label htmlFor="email" className="float-left mx-10">Email</label>
                        <input
                            type="email"
                            className="flex"
                            {...register("email", {required: true, minLength: 4})}
                        />
                        {errors.email?.type === "required" && (
                            <span role="alert" className="text-red-400">Email is required</span>
                        )}
                        {errors.email && errors.email.type === "minLength" && (
                            <span className="text-blue-700">Min length exceeded</span>
                        )}
                    </div>
                    <div className="flex my-4">
                        <label htmlFor="password" className="float-left mx-10"> Password </label>
                        <input
                            type="password"
                            {...register("password", {required: true, minLength: 8})}
                            className="flex"
                        />
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
        </>
    )
}