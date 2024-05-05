// App.js
import React from 'react';
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Income from './Pages/Income';
import Expenses from './Pages/Expenses';
import Transactions from './Pages/transactions';
import LoginForm from './Pages/login';
import SignupPage from './Pages/SignUp';
import {Toaster } from 'react-hot-toast';
import { GlobalProvider } from './Context/globalContext';
import Report from './Pages/reports';
function App(){
  return (
    <>
    
    <GlobalProvider>
    <Toaster position='bottom-right' toastOptions={{duraion:2000}} />
    
   <Routes>
    <Route  path='/signup' element={<SignupPage/>} />
    <Route  path='/income' element={<Income/>} />
    <Route  path='/expenses' element={<Expenses/>} />
    <Route  path='/transactions' element={<Transactions/>} />
    <Route  path='/' element={<LoginForm/>} />
    <Route  path='/dashboard' element={<Dashboard/>} />
    <Route  path='/reports' element={<Report/>} />
   </Routes>
   </GlobalProvider>

    </>
  );
}

export default App;
