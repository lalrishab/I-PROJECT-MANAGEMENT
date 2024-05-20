import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import LoginPage from './components/LoginSignup/LoginSignup.jsx'
import Home from './components/Home/Home.jsx'
import ToDo from './components/ToDo/ToDo.jsx'

const router= createBrowserRouter([
   {
     path:'/',
     element:<Layout />,
     children: [
      {
        path:"",
        element:<LoginPage />
      },
      {
        path:"Home",
        element:<Home />
      },
      {
        path:"ToDo/:index",
        element:<ToDo />
      }
      
     ]

   }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
