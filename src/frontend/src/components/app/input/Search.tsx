import React, {useState, useEffect} from "react";
import axios from "axios";
import NotFound from "../exception/NotFound";
import {useNavigate} from "react-router-dom";
import Header from "../../common/header/Header";

export default function Search() {
    const [query, setQuery] = useState('');
    const [searchContent, setSearchContent] = useState("");
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const {data} = await axios.get(
                `${baseURL}./search?q=${query}`
            );
            setSearchContent(data.products);
            navigate(`/Result?q=${query}`)
        } catch (error: any) {
            <NotFound/>
        }
    };

    return (
        <>
            <Header/>
            <div>
                <div className="">
                    <input
                        type="search"
                        placeholder=" Search Something ..."
                        className=" w-1/4 h-8 outline-double mx-4 text-black indent-4"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => fetchData()}
                    >
                        Search
                    </button>
                </div>
            </div>
        </>
    )
}