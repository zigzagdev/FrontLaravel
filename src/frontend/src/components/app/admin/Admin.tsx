import React, {useState, useEffect} from "react";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

type adminData = {
    id: number,
    name: string,
    email: string,
}

// export function CreateAdmin() {
//
// }

export function AdminData() {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const [adminData, setAdminData] = useState<adminData>({
        id: 0,
        email: '',
        name: ''
    });
    useEffect(() => {
        axios.get(`${baseURL}./admin/profile`)
            .then(res => {
                setAdminData(res.data.data.profile)
            })
    }, [])
    return (
        <>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div>{adminData.name}</div>
            </div>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div>{adminData.email}</div>
            </div>
        </>
    )
}

export function UpdateEmail() {
    const [AdminData, setAdminData] = useState<adminData>({
        id: 0,
        name: "",
        email: "",
    });
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<adminData>()
    useEffect(() => {
        axios.get(`${baseURL}./admin/profile`)
            .then(res => {
                setAdminData(res.data.data.profile)
            })
    }, [])

    const onSubmit: SubmitHandler<adminData> = (data: adminData) => {
        axios
            .put<adminData>(`${baseURL}./admin/update/email`, {
                email: AdminData.email,
                name: AdminData.name
            })
            .then((res) => {
                return (
                    navigate('/Admin')
                )
            })
            .catch((error: any) => {
                if (error.response.statusText == 'Bad Request') {
                    setError('Item Information could not updated ...');
                } else {
                    setError('Internal server error is happened. Please do it again.');
                }
            })
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4 mx-32 block text-lg duration-700">
                    {AdminData.name}
                </div>
                <div className="my-4 mx-32 block text-lg duration-700">
                    <input
                        type="email"
                        placeholder=""
                        value={AdminData.email}
                        {...register("email", {required: true, minLength: 4, maxLength: 100})}
                        onChange={(eachData) => setAdminData({...AdminData, email: eachData.target.value})}
                    />
                    {errors.email?.type === "required" && (
                        <p role="alert" className="text-red-300">ItemName is required</p>
                    )}
                    {errors.email && errors.email.type === "minLength" && (
                        <p role="alert" className="text-red-400">You need more than 4 characters.</p>
                    )}
                    {errors.email && errors.email.type === "maxLength" && (
                        <p role="alert" className="text-red-500">You have to written in less than 100 characters.</p>
                    )}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            <div className="my-10 mx-5 text-red-600 font-mono text-lg">
                {error}
            </div>
        </>
    )
}

// export function UpdateAdminName() {
//
// }


// export function DeleteAdmin() {
//
// }