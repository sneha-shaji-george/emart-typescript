import { createBrowserRouter } from "react-router-dom";

// import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import RedirectPage from "../Components/RedirectPage/RedirectPage";
import Login from "../Pages/Login";
import Register from "./Register/Register";
// import Home from "./Home/Home";
// import ProductListing from "./ProductListing/ProductListing";
// import ProductDetail from "./ProductDetail/ProductDetail";
// import CartPage from "./CartPage/CartPage";
// import WishListPage from "./WishListPage/WishListPage";
// import ProductSearch from "./ProductSearch/ProductSearch";
// import { CheckoutPage } from "../Components/Checkout/CheckoutPage/CheckoutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  // {
  //   path: "/home",
  //   element: <PrivateRoute elementToRender={<Home />} />,
  // },
  // {
  //   path: "/category/:category",
  //   element: <PrivateRoute elementToRender={<ProductListing />} />,
  // },
  // {
  //   path: "/product/:id",
  //   element: <PrivateRoute elementToRender={<ProductDetail />} />,
  // },
  // {
  //   path: "/cart",
  //   element: <PrivateRoute elementToRender={<CartPage />} />,
  // },
  // {
  //   path: "/wishlist",
  //   element: <PrivateRoute elementToRender={<WishListPage />} />,
  // },
  // {
  //   path: "/search/:searchProduct",
  //   element: <PrivateRoute elementToRender={<ProductSearch />} />,
  // },
  // {
  //   path: "checkout/:id",
  //   element: <PrivateRoute elementToRender={<CheckoutPage />} />,
  // },
]);
