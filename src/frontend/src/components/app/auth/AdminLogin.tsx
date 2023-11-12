import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";

type Inputs = {
    email: string,
    password: string
}

export default function Login() {
    const [error, setError] = useState('');
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios
            .post<Inputs>(`${baseURL}./admin/login`, data)
            .then((res) => {
                return (
                    navigate('/')
                )
            })
            .catch((error: any) => {
                if (error.response.statusText == 'Bad Request') {
                    setError('Email or Password is wrong ...');
                } else {
                    setError('Internal server error is happened. Please do it again.');
                }
            });
    }
    return (
        <>
            <div className="my-5 mx-36">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="my-5">
                        <strong className="text-red-600">Login</strong>
                    </h1>
                    <p className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            {...register("email", {required: true, minLength: 4})}
                        />
                        {errors.email?.type === "required" && (
                            <p role="alert" className="text-red-400">Email is required</p>
                        )}
                        {errors.email && errors.email.type === "minLength" && (
                            <span className="text-blue-700">Min length exceeded</span>
                        )}
                    </p>
                    <p className="item">
                        <label htmlFor="password"> Password </label>
                        <input type="password" {...register("password", {required: true, minLength: 8})}/>
                        {errors.password?.type === "required" && (
                            <p role="alert" className="text-red-400">Password is required</p>
                        )}
                        {errors.password && errors.password.type === "minLength" && (
                            <span className="text-blue-700">Min length exceeded</span>
                        )}
                    </p>
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
        </>
    )
}