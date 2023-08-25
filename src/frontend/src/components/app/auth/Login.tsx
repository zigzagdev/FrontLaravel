import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";

type Inputs = {
    email: string,
    password: string
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const AuthCheck = (e: React.FormEvent) => {
        e.preventDefault();
        const login = (data: any) => {
            axios
                .post<Inputs>(`${baseURL}./login`, {
                    email,
                    password
                })
                .then((res) => {
                    return (
                        navigate('/')
                    )
                })
                .catch((error: any) => {
                    console.log(error.response.statusText);
                });
        }
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
                            {...register("email", { required: true, minLength: 4 })}

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
                        <input type="password" {...register("password", {required: "emailを入力してください", minLength: 8})}/>
                        {errors.password?.type === "required" && (
                            <p role="alert" className="text-red-400">Email is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p role="alert" className="text-red-400">input more than 8 characters.</p>
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
                </form>
            </div>
        </>
    )
}








