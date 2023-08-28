import React, {useState, useEffect} from "react";
import axios from "axios";
import NotFound from "../exception/NotFound";
import {useNavigate} from "react-router-dom";

export default function Search() {
    const [searchContent, setSearchContent] = useState("");
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.post(
                    `${baseURL}./search?q=${searchContent}`
                );

                setSearchContent(data.products);
            } catch (error) {
                <NotFound/>
            }
        };
        fetchData();
    }, [searchContent]);
    return (
        <>
            <div>
                <div>
                    <div className="">
                    <input
                        type="search"
                        placeholder=" Search Something ..."
                        className=" w-1/4 h-8 outline-double mx-4 text-black indent-4"
                        value={searchContent}
                        onChange={(e) => {
                            setSearchContent(e.target.value);
                        }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => {
                            navigate(`/Result?q=${searchContent}`)
                        }}
                    >
                        Search
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}










