import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getVideogames, getVideogamesByName, changeLoadingState } from '../actions/index.js'   //// Importo las Action Creators.

import NavBar from './NavBar.js';  //// Importo los componentes que voy a necesitar en este componente.
import Card from './Card.js';


export default function Home() {



    return (
        <div>
            <NavBar />
             HOME
        </div>
    );
};


