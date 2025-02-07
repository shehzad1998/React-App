import React from 'react';
import ReactDOM from 'react-dom/client'
import Header from './Header';
import '../../index.css';
import Body from './body';


const App = () =>{
    return(
        <div>
            <div >
                <Header/>
                <Body/>
            </div>
        </div>

    );
};


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>);