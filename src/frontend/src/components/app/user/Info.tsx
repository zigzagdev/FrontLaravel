import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


type userData = {
    id: number,
    name: string,
    email: string,
}

export function EachUserData() {
    const [userData, setUserData] = useState<userData>({
        id: 0,
        email: '',
        name: ''
    });
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    let {id} = useParams();

    useEffect(() => {
        axios.get(`${baseURL}./user/` + id)
            .then(res => {
                setUserData(res.data.data.profile)
            })
    }, [])
    console.log(userData);
    return (
        <>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div>{userData.name}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                    <a href={`/User/` + id + `/Name`}>Name</a>
                </button>
            </div>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div>{userData.email}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                    <a href={`/User/` + id + `/Email`}>Email</a>
                </button>
            </div>
        </>
    )
}

export function UpdateUserName() {
    return (
        <>
            <div>
                name
            </div>
        </>
    )
}

export function UpdateUserEmail() {
    return (
        <>
            <div>
                email
            </div>
        </>
    )
}