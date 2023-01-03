import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from 'routes';
import './utils/http';


const App = () => {
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    );
}

export default App;