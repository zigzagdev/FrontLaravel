import React, {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../../common/Const";
import {useNavigate, useParams} from "react-router-dom";

export function LogOut() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const onSubmit = () => {
        axios
            .post(`${BASE_URL}user/${id}/logout`)
            .then((res) => {
                return (
                    navigate('/')
                )
            })
            .catch((error: any) => {
                if (error.response.statusText === 'Bad Request') {
                    setError('Email or Password is wrong ...');
                } else if (error.response.statusText === 'Not Acceptable') {
                    setError('Email or Password is wrong... Please do it again');
                } else {
                    setError('Internal server error is happened. Please do it again.')
                }
            });
    }
    return (
        <>
            <button
                onClick={onSubmit}
                className="button-blue"
            >
                Logout
            </button>
            {error}
        </>
    )
}