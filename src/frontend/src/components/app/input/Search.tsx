import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Header from "../../common/header/Header";

export default function Search() {
    const [query, setQuery] = useState('');
    const [searchContent, setSearchContent] = useState("");
    const [error, setError] = useState("");
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
            setError('Some words must be filled ...');
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
                        type="submit"
                        onClick={fetchData}
                    >
                        Search
                    </button>
                    <p className="my-10 mx-5 text-red-600 font-mono text-lg">{error}</p>
                </div>
            </div>
        </>
    )
}