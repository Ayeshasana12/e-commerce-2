import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error-page/ErrorPage";
import ProductsDetails from "./components/product-details/ProductsDetails";
import LayoutSection from "./components/layout/LayoutSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutSection />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "product-details/:product_id",
        element: <ProductsDetails />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
