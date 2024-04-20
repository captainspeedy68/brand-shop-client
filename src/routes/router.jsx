import React, { Suspense } from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Description from "../cards/Description";
import Loading from "../cards/Loading";
const AddProduct = React.lazy(() => import("../pages/AddProduct"))
const Root = React.lazy(() => import("../layout/Root"))
import Comments from "../pages/Comments";
// import Details from "../pages/Details";
import Features from "../pages/Features";
const Home = React.lazy(() => import("../pages/Home"));
const Products = React.lazy(() => import("../pages/Products"));
const MyCart = React.lazy(() => import("../pages/MyCart"));
import Login from "../pages/Login";
const DetailsRoot = React.lazy(() => import("../pages/DetailsRoot"));
const Update = React.lazy(() => import("../pages/Update"));
// import MyCart from "../pages/MyCart";
import Register from "../pages/Register";
import PrivateRout from "../providers/PrivateRout";
// import Update from "../pages/Update";

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
      </Suspense>,
      },
      {
        path: "/mycart",
        element: <PrivateRout><Suspense fallback={<Loading></Loading>}>
        <MyCart/>
      </Suspense></PrivateRout>,
        loader: async () => {
          try {
            const response = await fetch(`http://localhost:3000/products`);
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
        path: "/addproduct",
        element: <PrivateRout><Suspense fallback={<Loading></Loading>}>
        <AddProduct/>
      </Suspense></PrivateRout>
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
        element: <PrivateRout><Suspense fallback={<Loading></Loading>}>
        <DetailsRoot/>
      </Suspense></PrivateRout>,
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
      },
      {
        path: `/brands/products/update/:id/`,
        element: <PrivateRout><Suspense fallback={<Loading></Loading>}>
        <Update/>
      </Suspense></PrivateRout>,
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
      }
    ]
  },
]);

export default router;