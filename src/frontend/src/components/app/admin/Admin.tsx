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
                <input type="text" placeholder="" name="adminName" defaultValue={adminData.name}/>
            </div>
            <div className="my-4 mx-32 block text-lg duration-700">
                <input type="email" placeholder="" name="adminEmail" defaultValue={adminData.email}/>
            </div>
        </>
    )
}

// export function UpdateEmail() {
// const [admin, setAdmin] = useState<adminData>({
//     id: 0,
//     name: "",
//     email: "",
//     password: ""
// });
// const baseURL = process.env.REACT_APP_API_BASE_URL;
// const navigate = useNavigate();
// const [error, setError] = useState('');
// const {register, handleSubmit, formState: {errors}} = useForm<adminData>()
// const onSubmit: SubmitHandler<adminData> = (data: adminData) => {
//     axios
//         .put<adminData>(`${baseURL}./update/admin/email`, {
//             email: adminData.email,
//             name: adminData.name
//         })
//         .then((res) => {
//             return (
//                 navigate('/')
//             )
//         })
//         .catch((error: any) => {
//             if (error.response.statusText == 'Bad Request') {
//                 setError('Item Information could not updated ...');
//             } else {
//                 setError('Internal server error is happened. Please do it again.');
//             }
//         });
//     useEffect(() => {
//         axios.get(`${baseURL}./admin/profile`)
//             .then(res => {
//                 setAdminData(res.data.data.profile)
//             })
//     }, [])
//         <>
// <form onSubmit={handleSubmit(onSubmit)}>
//     <div className="my-4 mx-32 block text-lg duration-700">
//         <input type="text" placeholder="" name="adminName" defaultValue={adminData.name}/>
//     </div>
//     <div className="my-4 mx-32 block text-lg duration-700">
//         <input type="email" placeholder="" name="adminEmail" defaultValue={adminData.email}/>
//     </div>
// </form>
//         </>
//     )
// }

// export function UpdateAdminData() {
//
// }
//
//
// export function DeleteAdmin() {
//
// }