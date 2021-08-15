import Rect, { useEffect, useState } from 'react';
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

    useEffect(async () => {
        await dispatch(getDetails(props.match.params.id));   // Accedo a los detalles de la receta clickeada.
        setloading(false)
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
                                    <h1>{details.name}</h1>
                                    <div className={s.columns}>

                                        <div className={s.column_1}>
                                            <h2>Diets:</h2>
                                            {
                                                details.diets.length ? details.diets.map((d, i) => {
                                                    return (<h4 key={i}>{d}</h4>)
                                                })
                                                    : <h4> There are no diets for this recipe.</h4>
                                            }
                                        </div>

                                        <div className={s.column_2}>
                                            <h4>Score: {details.score}</h4>
                                            <h4>Health Score: {details.healthScore}</h4>


                                            <h2>Dish Types:</h2>
                                            {
                                                details.dishTypes ? details.dishTypes.map((dt, i) => {
                                                    return (<h4 key={i}>{dt}</h4>)
                                                }) :
                                                    <h4>This recipe has no dish types</h4>
                                            }
                                        </div>
                                    </div>


                                </div>
                            </div>
                            {
                                details.summary ? <p>Summary: {details.summary.replace(/(<([^>]+)>)/ig, '')}</p>
                                    : <p>Sumary: There are no a summary for this recipe.</p>
                            }
                            {
                                details.instructions ? <p>Instructions: {details.instructions.replace(/(<([^>]+)>)/ig, '')}</p>
                                    : <p>Instructions: There are no instructions for this recipe.</p>
                            }
                        </div>
                        : <h1>Loading...</h1>
                }
            </fieldset>
            <Footer />

        </div>
    )
}


