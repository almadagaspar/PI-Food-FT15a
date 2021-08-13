import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import store from './store/index.js'
import App from './App';
import './index.css';
// import reportWebVitals from './reportWebVitals';   

ReactDOM.render(
  // Para poder usar Redux envuelvo mi aplicación con el componente 'Provider', y le paso el store como parámetro.
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>   {/* Envuelvo la aplicación con el componente 'BrowserRouter' para poder usar ruteo*/}
        <App />      {/* Mi componente principal */}
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function  
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
