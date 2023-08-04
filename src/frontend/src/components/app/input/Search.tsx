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
                <input
                    type="search"
                    placeholder="Search here"
                    value={searchContent}
                    onChange={(e) => {
                        setSearchContent(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        navigate(`/Result?q=${searchContent}`)
                    }}
                >
                    Search
                </button>
            </div>
        </>
    )
}