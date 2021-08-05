import { createStore, applyMiddleware, compose } from "redux"; 
import reducer from '../reducers/index.js'
import thunk from "redux-thunk";  


const store = createStore(reducer, // Creo un nuevo store, y le paso por parámetro el Reducer para que queden conectados.
    compose(applyMiddleware(thunk), // También hay que pasarle como parámetro la función 'applyMiddleware(thunk)' para poder hacer peticiones asincronas.
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Esto es para poder usar la extención 'Redux DevTool' en Chrome. 
        // La función compose() la uso solo cuando tengo que pasarle tres parametros a 'createStore'.
    ));

// const store = createStore(reducer, applyMiddleware(thunk));  // Para probar la aplicación en Opera o Firefox.


export default store;  // Exporto mi store para usarlo en el Provider de src/index.js 


