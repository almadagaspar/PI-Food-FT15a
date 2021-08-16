import s from "./Pagination.module.css"

export default function Pagination({ recipesPerPage, recipes, paginado, currentPage }) {
    const pageNumbers = [];   // Array con los números de las paginas que se mostraran.

    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {   // Agrego un nuevo número de pagina por cada 9 recetas que haya en mi estado 'recipes'.
        pageNumbers.push(i);   
    }

    return (
        <div className={s.pagination}>
            {pageNumbers &&
                pageNumbers.map(number => (     // Muestro todos los numeros de paginado que se crearon segun la cantidad total de recetas a mostrar.
                    <span key={number} onClick={() => paginado(number)} className={number === currentPage ? s.current_page : null}>{number}</span>   
                ))
            }
        </div>
    )
}


