import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../actions/index.js'
import NavBar from './NavBar.js';
import imageNotAvailable from "../imgs/imageNotAvalible.jpg"
import Footer from './Footer.js';
import s from "./Details.module.css"



export default function Details(props) {
    const details = useSelector(state => state.details)
    const dispatch = useDispatch();
    const [loading, setloading] = useState(true);  // Creo un estado local para almacenar dinamicamente el contenido del input con el nombre de la receta a buscar.

    useEffect( () => {
        async function loadDetails() {
            await dispatch(getDetails(props.match.params.id));   // Accedo a los detalles de la receta clickeada.
            setloading(false)
        }
        loadDetails()
    }, [dispatch, props.match.params.id])


    return (
        <div className={s.details}>
            <NavBar />
            <fieldset>
                <legend>Recipe details</legend>
                {
                    !loading ?
                        <div>
                            <div className={s.upper_details}>
                                <img src={details.image ? details.image : imageNotAvailable} alt="" />
                                <div className={s.right_side}>
                                    <div className={s.name}>{details.name}</div>
                                    <div className={s.columns}>

                                        <div className={s.column_1}>
                                            <span className={s.diets_title} >Diets:</span>
                                            {
                                                details.diets.length ? details.diets.map((d, i) => {
                                                    return (<span key={i}>• {d}</span>)
                                                })
                                                    : <span> There are no diets for this recipe.</span>
                                            }
                                        </div>

                                        <div className={s.column_2}>
                                            <span className={s.score}>Score: {details.score}</span>  <br />
                                            <span className={s.healt_score}>Health Score: {details.healthScore}</span> <br />


                                            <span className={s.dish_types}>Dish Types:</span>
                                            {
                                                details.dishTypes ? details.dishTypes.map((dt, i) => {
                                                    return (<span className={s.dish_types} key={i}>• {dt}</span>)
                                                }) :
                                                    <span className={s.dish_types}>This recipe has no dish types</span>
                                            }
                                        </div>
                                    </div>


                                </div>
                            </div>
                            {
                                details.summary ? <p className={s.info}>SUMMARY: {details.summary.replace(/(<([^>]+)>)/ig, '')}</p>
                                    : <p className={s.info}>SUMMARY: There are no a summary for this recipe.</p>
                            }
                            {
                                details.instructions ? <p className={s.info}>INSTRUCTIONS: {details.instructions.replace(/(<([^>]+)>)/ig, '')}</p>
                                    : <p className={s.info}>INSTRUCTIONS: There are no instructions for this recipe.</p>
                            }
                        </div>
                        : <h1 className={s.loading}>Loading...</h1>
                }
            </fieldset>
            <Footer />

        </div>
    )
}


