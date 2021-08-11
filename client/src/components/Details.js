import Rect, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './NavBar.js';
import { getDetails } from '../actions/index.js'


export default function Details(props) {
    console.log('PROPS: ', props);
    const details = useSelector(state => state.details)
    const dispatch = useDispatch();
    
    useEffect(  () => {
         dispatch(getDetails(props.match.params.id));   // Accedo a los detalles de la receta clickeada.
    }, [])
    
    // console.log(details)

    return (
        <div>
            <NavBar />
            <h1>Details</h1>
            {
                details ? <h1>{details.name}</h1> : <h1>Loading...</h1>

            }
        </div>
    )
}


