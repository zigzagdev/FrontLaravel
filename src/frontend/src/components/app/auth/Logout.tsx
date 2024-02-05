import React, {useState} from "react";
import axios, {AxiosError} from "axios";
import {BASE_URL} from "../../common/Const";
import {useNavigate} from "react-router-dom";


export default function Logout() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const logoutForm = () => {
        axios
            .post(`${BASE_URL}logout`)
            .then((res) => {
                return (
                    navigate('/')
                )
            })
            .catch((error: any) => {
                if (error.response.statusText === 'Bad Request') {
                    setError('Email or Password is wrong ...');
                    return (
                        navigate(`/Forget/Password`)
                    )
                } else if (error.response.statusText === 'Not Acceptable') {
                    setError('Email or Password is wrong... Please do it again');
                    return (
                        navigate(`/Forget/Password`)
                    )
                } else {
                    setError('Internal server error is happened. Please do it again.')
                    return (
                        navigate(`/Forget/Password`)
                    )
                }
            });
    }
    return (
        <>
            <button onClick={() => logoutForm()}>

            </button>
        </>
    )
}