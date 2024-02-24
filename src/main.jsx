import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  About,
  Contact,
  Home,
  Shop
} from './pages/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/shop' element={<Shop />}/>
      <Route path='/contact' element={<Contact />}/>
    </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
