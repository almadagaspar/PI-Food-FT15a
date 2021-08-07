import React from 'react';

export default function Paginado({ recipesPerPage, recipes, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            {/* <ul> */}
                {pageNumbers &&
                    pageNumbers.map((number,i) => (
                        // <li key={number}>
                            <span key={number} onClick={() => paginado(number) }>{number}</span>
                        /* </li> */
                    ))
                }
            {/* </ul> */}
        </nav>
    )
}