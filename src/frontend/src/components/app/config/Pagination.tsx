import React, {useState} from "react";

export function Pagination(
    props: {
        currentPage: number
        , lastPage: number
        , from: number
        , next: string
        , prev: string
        , apiUrl: string
        , fetchItemData: (text: string) => void
    }
) {
    const pageNumbers = [];
    for (let i = 1; i <= props.lastPage; i++) {
        pageNumbers.push(i);
    }
    const [current, setCurrent] = useState(props.currentPage);
    const handleNextPage = () => {
        let pageUrl = `${props.apiUrl}page=${current + 1}`;
        props.fetchItemData(pageUrl);
        setCurrent(current + 1);
    };
    const handlePreviousPage = () => {
        let pageUrl = `${props.apiUrl}page=${current - 1}`;
        props.fetchItemData(pageUrl);
        setCurrent(current - 1);
    };
    const numberClick = (pageNum: number) => {
        let pageUrl = `${props.apiUrl}page=${pageNum}`;
        props.fetchItemData(pageUrl);
        setCurrent(pageNum);
    }

    return (
        <>
            <div className="my-8 mx-5">
                <div className="text-violet-300 my-3 flex justify-center">
                    <span className="text-blue-700 px-1">Page</span>
                    {current} / {props.lastPage}
                </div>
                <div className="mx-16 flex justify-center">
                    {current != props.from ?
                        <button onClick={handlePreviousPage}
                                className="focus:outline-none text-white bg-purple-700 hover:bg-yellow-300
                            focus:ring-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-400
                            dark:hover:bg-yellow-400 dark:focus:ring-yellow-400 mx-1"
                        >
                            Before
                        </button>
                        : <div className="Font"> &emsp; &emsp;</div>
                    }
                    {pageNumbers.map((pageNum) => {
                        return (
                            <button
                                key={pageNum}
                                onClick={() => numberClick(pageNum)}
                                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
                            focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600
                            dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-1"
                            >
                                {pageNum}
                            </button>
                        )
                    })}
                    {current != props.lastPage ?
                        <button onClick={handleNextPage}
                                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
                            focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600
                            dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-1"
                        >
                            Next
                        </button>
                        : <div className="Font"> &emsp; &emsp;</div>
                    }
                </div>
            </div>
        </>
    )
}
