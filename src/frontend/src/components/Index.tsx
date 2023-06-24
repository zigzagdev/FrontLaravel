import React, {useState, useEffect} from "react";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import axios from "axios";

interface Info {
    id?: number,
    userName?: string,
    emailAddress?: string
}


export default function Index() {
    const [users, setUsers] = useState<Info[]>([]);
    useEffect(() => {
        axios.get('http://localhost:9901/api/userAll')
            .then(res => {
                setUsers(res.data.data.userInformation)

            })
    }, [])
    return (
        <>
            <Header/>
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
            <Footer/>
        </>
    )
}