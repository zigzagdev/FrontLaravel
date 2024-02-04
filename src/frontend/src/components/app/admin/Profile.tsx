import React, {useState, useEffect} from "react";
import axios, {AxiosError} from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams, Link} from "react-router-dom";
import AdminHeader from "../../common/header/AdminHeader";
import AdminFooter from "../../common/footer/AdminFooter";
import {Pagination} from "../config/Pagination";
import {SideBar} from "./func/AdminComponent";
import {BASE_URL} from "../../common/Const";
import {AxiosErrorResponse, Url, PaginationData} from "../../common/types/Interface";

type CreateAdmin = {
    name: string,
    email: string,
    password: string,
}

type AdminData = {
    id: number,
    name: string,
    email: string,
    totalItems: number
}

type EmailData = {
    id: number,
    email: string,
}

type NameData = {
    id: number,
    name: string,
}

type UserData = {
    id: number,
    name: string,
    email: string,
}

export function CreateAdmin() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<CreateAdmin>()
    const onSubmit: SubmitHandler<CreateAdmin> = (data) => {
        axios
            .post(`${BASE_URL}./admin/create`, data)
            .then((res) => {
                const {id} = res.data.data.profile
                return (
                    navigate(`/Admin/${id}/Profile`)
                )
            })
            .catch((error) => {
                if (
                    (error as AxiosError<AxiosErrorResponse>).response &&
                    (error as AxiosError<AxiosErrorResponse>).response!.status === 400
                ) {
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
                    <div>Name</div>
                    <input
                        className="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg"
                        {...register("name", {required: true, minLength: 4, maxLength: 100})}
                        type="text"
                    />
                    {errors.name?.type === "required" && (
                        <span role="alert" className="text-red-400">ItemName is required</span>
                    )}
                    <div>Email</div>
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
                        autoComplete="email"
                    />
                    {errors.email?.type === "pattern" && (
                        <span role="alert" className="text-red-400">{errors.email.message}</span>
                    )}
                    <div>Password</div>
                    <input
                        className="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg"
                        {...register("password", {required: true, minLength: 8, maxLength: 255})}
                        type="password"
                        autoComplete="password"
                    />
                    <div>
                        <span role="alert" className="text-red-700 text-ls">{error}</span>
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
    const {id} = useParams<{ id: string }>();
    const [error, setError] = useState("");
    const [adminData, setAdminData] = useState<AdminData>({
        id: 0,
        email: '',
        name: '',
        totalItems: 0
    });
    useEffect(() => {
        axios.get(`${BASE_URL}admin/${id}/profile`)
            .then(res => {
                setAdminData(res.data.data.profile)
            })
            .catch((error) => {
                if (
                    (error as AxiosError<AxiosErrorResponse>).response &&
                    (error as AxiosError<AxiosErrorResponse>).response!.status === 400
                )
                setError('Email or Password is wrong ...');
                setTimeout("location.href='/Admin/Login'", 10000);
            })
    }, [])
    return (
        <>
            <AdminHeader/>
            <div className="">
                <SideBar/>
                <div className="w-6/12 mx-auto">
                    <div className="text-lg duration-700 pb-8 h-auto bg-gray-200/30 backdrop-blur-lg
                         rounded-md border">
                        <strong className="block my-4 text-center">Profile Data</strong>
                        <div className="text-lg duration-700 flex px-16 py-6 justify-around">
                            <div className="w-11/12">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                                    <Link to={`/Admin/${id}/Update/Name`}>Name</Link>
                                </button>
                            </div>
                            <div className="break-all w-full">
                                {adminData.name}
                            </div>
                        </div>
                        <div className="text-lg duration-700 flex px-16 py-6 justify-around">
                            <div className="w-11/12">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                                    <Link to={`/Admin/${id}/Update/Email`}>Email</Link>
                                </button>
                            </div>
                            <div className="break-all w-full">
                                {adminData.email}
                            </div>
                        </div>
                        <div className="text-lg duration-700 flex px-16 py-6 justify-around">
                            <div className="w-11/12">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white
                               font-bold py-2 px-4 border border-blue-700 rounded">
                                    <Link to={''}>RegisteredItems</Link>
                                </button>
                            </div>
                            <div className="break-all w-full">
                                {adminData.totalItems}
                            </div>
                        </div>
                        <p role="alert" className="text-red-700 text-ls">{error}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export function EditAdminName() {
    const [adminName, setAdminName] = useState<NameData>({
        id: 0,
        name: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {id} = useParams<{ id: string }>();
    const {register, handleSubmit, formState: {errors}} = useForm<NameData>();
    const onSubmit: SubmitHandler<NameData> = (data: NameData) => {
        axios
            .put<NameData>(`${BASE_URL}admin/${id}/update/name`, {
                name: adminName.name,
            })
            .then((res) => {
                return (
                    navigate(`/Admin/${id}/Profile`)
                )
            })
            .catch((error) => {
                if (
                    (error as AxiosError<AxiosErrorResponse>).response &&
                    (error as AxiosError<AxiosErrorResponse>).response!.status === 400
                ) {
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
        axios.get(`${BASE_URL}admin/${id}/profile`)
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
    const [adminEmail, setAdminEmail] = useState<EmailData>({
        id: 0,
        email: "",
    });
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<EmailData>()
    useEffect(() => {
        axios.get(`${BASE_URL}admin/${id}/profile`)
            .then(res => {
                setAdminEmail(res.data.data.profile)
            })
    }, [])

    const onSubmit: SubmitHandler<EmailData> = (data: EmailData) => {
        axios
            .put<EmailData>(`${BASE_URL}./admin/${id}/update/email`, {
                email: adminEmail.email,
            })
            .then((res) => {
                return (
                    navigate(`/Admin/${id}/Profile`)
                )
            })
            .catch((error) => {
                if (
                    (error as AxiosError<AxiosErrorResponse>).response &&
                    (error as AxiosError<AxiosErrorResponse>).response!.status === 400
                ) {
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
    const [users, setUsers] = useState<UserData[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [paginationData, setPaginationData] = useState<PaginationData>(({
        current_page: 1,
        from: 0,
        last_page: 0,
    }));
    const [url, setUrl] = useState<Url>(({
        next: '',
        prev: '',
    }));
    const {id} = useParams<{ id: string }>();
    let apiUrl = `${BASE_URL}admin/${id}/user/all?`;

    const fetchItemData = (apiUrl: string) => {
        axios
            .get(apiUrl)
            .then((data) => {
                setUsers(data.data.data.userInformation);
                setPaginationData(data.data.meta);
                setUrl(data.data.links);
            })
            .catch((error) => {
                if (
                    (error as AxiosError<AxiosErrorResponse>).response &&
                    (error as AxiosError<AxiosErrorResponse>).response!.status === 400
                ) {
                    setErrorMessage('Something is wrong ....')
                }
            });
    };
    useEffect(() => {
        fetchItemData(apiUrl);
    }, []);
    return (
        <>
            <AdminHeader/>
            <div className="grid grid-cols-3 gap-4 mx-24">
                {users.map((user: UserData) => {
                    return (
                        <div className="grid grid-rows-5 gap-4 bg-blue-400 rounded-md px-8 pb-8" key={user.id}>
                            <div className="font-bold pt-6">User Name</div>
                            <div className="font-bold pt-2">{user.name}</div>
                            <div className="font-bold pt-2">User Email</div>
                            <div className="font-bold  pt-2">{user.email}</div>
                            <button
                                className="items-center bg-blue-500 hover:bg-blue-700
                                text-white font-bold px-4 rounded-full"
                            >
                                More Detail
                            </button>
                        </div>
                    )
                })}
            </div>
            <p role="alert" className="text-red-400">{errorMessage}</p>
            <div className="my-3 mx-5">
                <Pagination
                    currentPage={paginationData.current_page}
                    lastPage={paginationData.last_page}
                    from={paginationData.from}
                    next={url.next}
                    prev={url.prev}
                    apiUrl={apiUrl}
                    fetchItemData={fetchItemData}
                />
            </div>
            <AdminFooter/>
        </>
    )
}

// export function DeleteAdmin() {

//
// }