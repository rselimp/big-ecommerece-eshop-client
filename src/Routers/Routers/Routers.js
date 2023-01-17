import { createBrowserRouter } from "react-router-dom"
import AddProducts from "../../Admin/AddProducts"
import AllProducts from "../../Admin/AllProducts"
import Dashboard from "../../Admin/Dashboard"
import DashboardLayout from "../../Layout/DashboardLayout"
import Main from "../../Layout/Main"
import Cart from "../../Pages/Cart/Cart"
import Checkout from "../../Pages/Checkout/Checkout"
import Home from "../../Pages/Home/Home"
import Login from "../../Pages/Login/Login"
import Orders from "../../Pages/Orders/Orders"
import ProductDetails from "../../Pages/ProductDetails/ProductDetails"
import Shop from "../../Pages/Shop/Shop"
import SignUp from "../../Pages/SignUp/SignUp"
import PrivateRoute from "./PrivateRoute"



const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/shop',
                element:<Shop></Shop>
            },
            {
                path:'/shop/:id',
                loader: async({params}) =>{
                    return fetch(`https://big-esupershop-server.vercel.app/products/${params.id}`)
                },
                element:<ProductDetails></ProductDetails>,
                

            },
            {
                path:'/cart',
                element:<Cart></Cart>
            },
            {
                path:'/checkout',
                element:<PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/orders',
                element:<Orders></Orders>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                path:'/dashboard',
                element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path:'/dashboard/allproducts/',
                element: <AllProducts></AllProducts>
            },
            {
                path:'/dashboard/addproducts/',
                element: <AddProducts></AddProducts>
            }
        ]
        
    }

])
export default router;