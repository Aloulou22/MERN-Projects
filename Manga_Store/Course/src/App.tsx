import { createBrowserRouter, RouterProvider , Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home"
import Cart from "./Pages/Cart"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppDispatch, useAppSelector } from "./App/Hooks";
import { useEffect } from "react";
import { cartTotal } from "./Features/ShopSlice";


const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet/>
    <Footer />
    </>
  )
}

const router = createBrowserRouter([
    {
      element : <Layout />,
      children : [
        {
          path : "/",
          element : <Home /> 
        },

        {
          path: "/cart",
          element: <Cart />
        }
      ]
    }

])

function App() {
  const { cartItem } = useAppSelector((state) => state.shop)

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(cartTotal())
  }, [cartItem, dispatch])

  return <RouterProvider router={router}/>
}

export default App 