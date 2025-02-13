import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import '../../index.css';
import Body from './body';
import About from './About';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Error from './Error';
import ResturantMenu from './ResturantMenu';


const App = () =>{
    return(
        <div>
            <div >
                <Header/>
                <Outlet/>
            </div>
        </div>

    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/Resturant/:resId",
                element: <ResturantMenu/>
            },
        ],
        errorElement: <Error/>,
       
    },
   
]);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);