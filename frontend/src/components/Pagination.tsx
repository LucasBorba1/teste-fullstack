import React from "react";
import { FunctionComponent } from "react";

interface paginationProps {
    totalUsers: number;
    usersPerPage: number;
    setCurrentPage: Function
    currentPage: number;
}

const Pagination: FunctionComponent<paginationProps> = ({totalUsers, usersPerPage, setCurrentPage, currentPage}) => {
    let pages = [];

    for (let i = 1; i<= Math.ceil(totalUsers/usersPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="m-1">
            {pages.map((page, i) => {
                return <button key={i} className={`py-1.5 px-5 rounded-md text-white hover:bg-blue-600 m-1 ${page===currentPage? 'bg-blue-500': 'bg-blue-300'}`} onClick={() => setCurrentPage(page)}>
                    <b>{page}</b>
                    </button>
            })}
        </div>
    )
}

export default Pagination;