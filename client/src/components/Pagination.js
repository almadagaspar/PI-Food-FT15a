// import React from 'react';
import s from "./Pagination.module.css"

export default function Pagination({ recipesPerPage, recipes, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={s.pagination}>
            {/* <ul> */}
                {pageNumbers &&
                    pageNumbers.map((number,i) => (
                        // <li key={number}>
                            <span key={number} onClick={() => paginado(number) }>{number}</span>
                        /* </li> */
                    ))
                }
            {/* </ul> */}
        </div>
    )
}