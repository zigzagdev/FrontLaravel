import React, {useState, useEffect} from "react";
import axios from "axios";

interface Info {
    id?: number,
    userName?: string,
    emailAddress?: string
}


export default function Index() {
    const [users, setUsers] = useState<Info[]>([]);
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        axios.get(`${baseURL}./userAll`)
            .then(res => {
                setUsers(res.data.data.userInformation)
            })
    }, [])
    return (
        <>
            <div className="my-3 block text-sm text-gray-300 duration-700 hover:text-gray-100">
                Top Page
            </div>
            <div>
                {users.map(user => {
                    return (
                        <>
                            {user.userName}
                        </>
                    )
                })}
            </div>
        </>
    )
}