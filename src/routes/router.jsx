import React, { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Description from "../cards/Description";
import Loading from "../cards/Loading";
const Root = React.lazy(() => import("../layout/Root"))
import AddProduct from "../pages/AddProduct";
import Comments from "../pages/Comments";
import Details from "../pages/Details";
import Features from "../pages/Features";
const Home = React.lazy(() => import("../pages/Home"));
const Products = React.lazy(() => import("../pages/Products"));
const DetailsRoot = React.lazy(() => import("../pages/DetailsRoot"));
import Login from "../pages/Login";
import MyCart from "../pages/MyCart";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<Loading></Loading>}>
      <Root />
    </Suspense>,
    errorElement: (error) => <div>
      <h2>{error}</h2>
      <p>We're working on fixing the issue. Please try again later.</p>
    </div>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<Loading></Loading>}>
          <Home />
        </Suspense>,
        // loader: async () => await fetch("http://localhost:3000/brands/")
      },
      {
        path: "/login",
        element: <Suspense fallback={<Loading></Loading>}>
          <Login />
        </Suspense>
      },
      {
        path: "/mycart",
        element: <MyCart></MyCart>
      },
      {
        path: "/addproduct",
        element: <AddProduct></AddProduct>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/brands/:brandName/",
        element: <Suspense fallback={<Loading></Loading>}>
          <Products />
        </Suspense>,
        // loader: ({ params }) => fetch(`http://localhost:3000/brands/${params.brandName}`)
        loader: async ({ params }) => {
          try {
            const response = await fetch(`http://localhost:3000/brands/${params.brandName}`);
            if (!response.ok) {
              throw new Error('Failed to fetch product details');
            }
            return await response.json();
          } catch (error) {
            throw new Error(`Error fetching product details: ${error.message}`);
          }
        }
      },
      {
        path: "/brands/products/:id/",
        element: <Suspense fallback={<Loading></Loading>}>
          <DetailsRoot />
        </Suspense>,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`http://localhost:3000/brands/products/${params.id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch product details');
            }
            return await response.json();
          } catch (error) {
            throw new Error(`Error fetching product details: ${error.message}`);
          }
        },
        children: [
          {
            path: "description",
            element: <Suspense fallback={<Loading></Loading>}>
              <Description />
            </Suspense>
          },
          {
            path: "features",
            element: <Features></Features>
          },
          {
            path: "comments",
            element: <Comments></Comments>
          }
        ]
      }
    ]
  },
]);

export default router;