import React, {useState, useEffect} from "react";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

type adminData = {
    id: number,
    name: string,
    email: string,
}

type emailData = {
    id: number,
    email: string,
}

type nameData = {
    id: number,
    name: string,
}

type userData = {
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
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                    <a href="/Admin/Update/Name">Name</a>
                </button>
            </div>
            <div className="my-4 mx-32 block text-lg duration-700">
                <div>{adminData.email}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                    <a href="/Admin/Update/Email">Email</a>
                </button>
            </div>
        </>
    )
}

export function UpdateName() {
    const [AdminName, setAdminName] = useState<nameData>({
        id: 0,
        name: "",
    });
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<nameData>();
    const onSubmit: SubmitHandler<nameData> = (data: nameData) => {
        axios
            .put<nameData>(`${baseURL}./admin/update`, {
                name: AdminName.name,
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
    useEffect(() => {
        axios.get(`${baseURL}./admin/profile`)
            .then(res => {
                setAdminName(res.data.data.profile)
            })
    }, [])
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4 mx-32 block text-lg duration-700">
                    <input
                        type="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        value={AdminName.name}
                        {...register("name", {required: true, minLength: 4, maxLength: 100})}
                        onChange={(e) => setAdminName({...AdminName, name: e.target.value})}
                    />
                    <div className="my-10 mx-5 text-red-600 font-mono text-lg">
                        {error}
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export function UpdateEmail() {
    const [AdminEmail, setAdminEmail] = useState<emailData>({
        id: 0,
        email: "",
    });
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<emailData>()
    useEffect(() => {
        axios.get(`${baseURL}./admin/profile`)
            .then(res => {
                setAdminEmail(res.data.data.profile)
            })
    }, [])

    const onSubmit: SubmitHandler<emailData> = (data: emailData) => {
        axios
            .put<emailData>(`${baseURL}./admin/update/email`, {
                email: AdminEmail.email,
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
                    <input
                        type="email"
                        placeholder=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={AdminEmail.email}
                        {...register("email", {required: true, minLength: 4, maxLength: 100})}
                        onChange={(e) => setAdminEmail({...AdminEmail, email: e.target.value})}
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
                    <div className="my-10 mx-5 text-red-600 font-mono text-lg">
                        {error}
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export function AllUsers() {
    const [users, setUsers] = useState<userData[]>([]);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        axios.get(`${baseURL}./admin/user/all`)
            .then(res => {
                setUsers(res.data.data.userInformation)
            })
    }, [])
    return (
        <>
            <div className="grid grid-cols-3 gap-4 mx-24">
                {users.map((user: userData) => {
                    return (
                        <div className="grid grid-rows-5 gap-4 bg-blue-400 rounded-md px-8 pb-8" key={user.id}>
                            <div className="font-bold pt-6">User Name</div>
                            <div className="font-bold pt-2">{user.name}</div>
                            <div className="font-bold pt-2">User Email</div>
                            <div className="font-bold  pt-2">{user.email}</div>
                            <button
                                className="items-center bg-blue-500 hover:bg-blue-700
                                text-white font-bold px-4 rounded-full"
                            >More Detail</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

// export function DeleteAdmin() {

//
// }