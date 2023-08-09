import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

type Inputs = {
    email: string,
    password: string
}

type errorMessage = {
    error: string
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const AuthCheck = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            axios.post<Inputs>(`${baseURL}./login`, {
                email,
                password
            })
                .then((res) => {
                    return (
                        navigate('/')
                    )
                })
        } catch (e) {
            console.error(error);

        }
    }
    return (
        <>
            <div className="my-5 mx-36">
                <form action="" method="post" onSubmit={AuthCheck}>
                    {error && <div>{error}</div>}
                    <h1 className="my-5">
                        <strong className="text-red-600">Login</strong>
                    </h1>
                    <p className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </p>
                    <p className="item">
                        <label htmlFor="password"> Password </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
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