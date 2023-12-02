import React, {useState, useEffect} from "react";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import AdminHeader from "../../common/header/AdminHeader";
import AdminFooter from "../../common/footer/AdminFooter";

type createAdmin = {
    name: string,
    email: string,
    password: string,
}

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

export function CreateAdmin() {
    const [error, setError] = useState("");
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<createAdmin>()
    const onSubmit: SubmitHandler<createAdmin> = (data) => {
        axios
            .post(`${baseURL}./admin/create`, data)
            .then((res) => {
                const {id} = res.data.data.profile
                return (
                    navigate(`/Admin/${id}/Profile`)
                )
            })
            .catch((error: any) => {
                if (error.res !== null) {
                    setError('User can not registered ...');
                    setTimeout("location.href='/Admin/Create'", 10000);
                } else {
                    setError('Internal server error is happened. Please do it again.');
                    setTimeout("location.href='/Admin/Create'", 10000);
                }
            });
    }
    return (
        <>
            <AdminHeader/>
            <div className="my-10 mx-9">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>Name</p>
                    <input
                        className="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg"
                        {...register("name", {required: true, minLength: 4, maxLength: 100})}
                        type="text"
                    />
                    {errors.name?.type === "required" && (
                        <p role="alert" className="text-red-400">ItemName is required</p>
                    )}
                    <p>Email</p>
                    <input
                        className="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg"
                        {...register("email", {
                            required: "required",
                            minLength: 4,
                            maxLength: 100,
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Entered email does not match format",
                            },
                        })}
                        type="email"
                    />
                    {errors.email?.type === "pattern" && (
                        <p role="alert" className="text-red-400">{errors.email.message}</p>
                    )}
                    <p>Password</p>
                    <input
                        className="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg"
                        {...register("password", {required: true, minLength: 8, maxLength: 255})}
                        type="password"
                    />
                    <div>
                        <p role="alert" className="text-red-700 text-ls">{error}</p>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <AdminFooter/>
        </>
    )
}

export function AdminData() {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const {id} = useParams<{ id: string }>();
    const [error, setError] = useState("");
    const [adminData, setAdminData] = useState<adminData>({
        id: 0,
        email: '',
        name: ''
    });
    useEffect(() => {
        axios.get(`${baseURL}./admin/${id}/profile`)
            .then(res => {
                setAdminData(res.data.data.profile)
            })
            .catch((error: any) => {
                setError('Email or Password is wrong ...');
                setTimeout("location.href='/Admin/Login'", 10000);
            })
    }, [])
    return (
        <>
            <AdminHeader/>
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
                <p role="alert" className="text-red-700 text-ls">{error}</p>
            </div>
            <AdminFooter/>
        </>
    )
}

export function EditAdminName() {
    const [adminName, setAdminName] = useState<nameData>({
        id: 0,
        name: "",
    });
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {id} = useParams<{ id: string }>();
    const {register, handleSubmit, formState: {errors}} = useForm<nameData>();
    const onSubmit: SubmitHandler<nameData> = (data: nameData) => {
        axios
            .put<nameData>(`${baseURL}./admin/${id}/update/name`, {
                name: adminName.name,
            })
            .then((res) => {
                return (
                    navigate(`/Admin/${id}/Profile`)
                )
            })
            .catch((error: any) => {
                if (error.response !== null) {
                    setError('Item Information could not updated ...');
                    setTimeout("location.href=`/Admin/${id}/Profile`", 10000);
                } else {
                    setError('Internal server error is happened. Please do it again.');
                    return (
                        navigate(`/Admin/Login`)
                    )
                }
            })
    };
    useEffect(() => {
        axios.get(`${baseURL}./admin/${id}/profile`)
            .then(res => {
                setAdminName(res.data.data.profile)
            })
            .catch((error: any) => {
                setError('Email or Password is wrong ...');
                setTimeout("location.href='/Admin/Login'", 10000);
            })
    }, [])
    return (
        <>
            <AdminHeader/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4 mx-32 block text-lg duration-700">
                    <input
                        type="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        value={adminName.name}
                        {...register("name", {required: true, minLength: 4, maxLength: 100})}
                        onChange={(e) => setAdminName({...adminName, name: e.target.value})}
                    />
                    {errors.name?.type === "required" && (
                        <p role="alert" className="text-red-300">MasterData name is required</p>
                    )}
                    {errors.name && errors.name.type === "minLength" && (
                        <p role="alert" className="text-red-400">You need more than 4 characters.</p>
                    )}
                    {errors.name && errors.name.type === "maxLength" && (
                        <p role="alert" className="text-red-500">You have to written in less than 100 characters.</p>
                    )}
                    <p className="my-10 mx-5 text-red-600 font-mono text-lg">{error}</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <AdminFooter/>
        </>
    )
}

export function EditAdminEmail() {
    const [adminEmail, setAdminEmail] = useState<emailData>({
        id: 0,
        email: "",
    });
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<emailData>()
    useEffect(() => {
        axios.get(`${baseURL}./admin/${id}/profile`)
            .then(res => {
                setAdminEmail(res.data.data.profile)
            })
    }, [])

    const onSubmit: SubmitHandler<emailData> = (data: emailData) => {
        axios
            .put<emailData>(`${baseURL}./admin/${id}/update/email`, {
                email: adminEmail.email,
            })
            .then((res) => {
                return (
                    navigate(`/Admin/${id}/Profile`)
                )
            })
            .catch((error: any) => {
                if (error.response.statusText !== null) {
                    setError('Item Information could not updated ...');
                    setTimeout("location.href=`/Admin/${id}/Profile`", 5000);
                } else {
                    setError('Internal server error is happened. Please do it again.');
                    setTimeout("location.href='/Admin/Login'", 5000);
                }
            })
    };
    return (
        <>
            <AdminHeader/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4 mx-32 block text-lg duration-700">
                    <input
                        type="email"
                        placeholder=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={adminEmail.email}
                        {...register("email", {required: true, minLength: 4, maxLength: 100})}
                        onChange={(e) => setAdminEmail({...adminEmail, email: e.target.value})}
                    />
                    {errors.email?.type === "required" && (
                        <p role="alert" className="text-red-300">Email is required</p>
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
            <AdminFooter/>
        </>
    )
}

export function AllUsers() {
    const [users, setUsers] = useState<userData[]>([]);
    const [error, setError] = useState("");
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const {id} = useParams<{ id: string }>();
    useEffect(() => {
        axios.get(`${baseURL}./admin/${id}/user/all`)
            .then(res => {
                setUsers(res.data.data.userInformation)
            })
            .catch((error: any) => {
                setError('Email or Password is wrong ...');
                setTimeout("location.href=`/Admin/${id}/Profile`", 10000);
            })
    }, [])
    return (
        <>
            <AdminHeader/>
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
                            >More Detail
                            </button>
                        </div>
                    )
                })}
                <p role="alert" className="text-red-400">{error}</p>
            </div>
            <AdminFooter/>
        </>
    )
}

// export function DeleteAdmin() {

//
// }