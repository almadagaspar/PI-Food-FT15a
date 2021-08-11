import Rect, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './NavBar.js';
import { getDetails } from '../actions/index.js'


export default function Details(props) {
    const details = useSelector(state => state.details)
    const dispatch = useDispatch();
    const [loading, setloading] = useState(true);  // Creo un estado local para almacenar dinamicamente el contenido del input con el nombre de la receta a buscar.

    useEffect( async () => {
        await dispatch(getDetails(props.match.params.id));   // Accedo a los detalles de la receta clickeada.
        setloading(false)
    }, [dispatch, props.match.params.id])



    useEffect(() => {
        console.log('Estoy en el DOM!!');
      return() => {
          console.log('Adios!!');
      }	
    },[])



    return (
        <Rect.Fragment>
            <NavBar />
            <h1>Details</h1>
            {
                !loading ?
                    <div>
                        <h1>Name: {details.name}</h1>
                        <p>Summary: {details.summary}</p>
                        <h4>Score: {details.score}</h4>
                        <h4>Health Score: {details.healthScore}</h4>
                        <p>Instructions: {details.instructions}</p>
                        <h2>Dish Types:</h2>
                        {
                            details.dishTypes ? details.dishTypes.map((dt, i) => {
                                return (
                                    <h4 ke={i}>{dt}</h4>
                                )
                            }) :
                            <h4>This recipe has no dish types</h4>


                        }
                        <h2>Diets:</h2>
                        {
                            details.diets?.map((d, i) => {
                                return (
                                    <h4 ke={i}>{d}</h4>
                                )
                            })

                        }


                    </div>

                 : <h1>Loading...</h1>

            }
        </Rect.Fragment>
    )
}


