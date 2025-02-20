import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import "../../index.css";
import Body from "./body";
import About from "./About";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./Error";
import ResturantMenu from "./ResturantMenu";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Cart from "./Cart";

const App = () => {
  return (
    <Provider store={appStore}>
      <div>
        <div>
          <Header />
          <Outlet />
        </div>
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/Resturant/:resId",
        element: <ResturantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
