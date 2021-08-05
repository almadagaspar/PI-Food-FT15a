import React from "react";
import { Route } from 'react-router-dom'

import Landing from './components/Landing.js';
import Home from './components/Home.js';
import Details from './components/Details.js';
import AddRecipe from './components/AddRecipe.js';

// En mi componente principal no renderizo nada; solo defino que ruta en la URL hará que se muestre el componente correspondiente.
function App() {   
  return (
    <React.Fragment>
    <Route exact path='/' component={Landing} />  
    <Route path='/home' component={Home} />
    <Route path='/details/:id' component={Details} />
    <Route path='/addrecipe' component={AddRecipe} />
  </React.Fragment>
  );
}

export default App;
