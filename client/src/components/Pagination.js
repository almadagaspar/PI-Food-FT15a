import s from "./Pagination.module.css"

export default function Pagination({ recipesPerPage, recipes, paginado }) {
    const pageNumbers = [];   // Array con los números de las paginas que se mostraran.

    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        pageNumbers.push(i);    // Agrego un nuevo número de pagina por cada grupo de 9 recetas que haya en mi estado 'recipes'.
    }

    return (
        <div className={s.pagination}>
            {pageNumbers &&
                pageNumbers.map(number => (
                    <span key={number} onClick={() => paginado(number)}>{number}</span>   // Muestro todos los numeros de paginado que se crearon segun la cantidad total de recetas a mostrar.
                ))
            }
        </div>
    )
}


