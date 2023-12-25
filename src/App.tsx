import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/defaultLayout/defaultLayout';
import Dashboard from './components/dashboard/dashboard';
import Users from './components/users/users';
import Products from './components/products/products';
import Orders from './components/orders/orders';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<DefaultLayout son={<Dashboard/>}/>}/>
        <Route path='/user' element={<DefaultLayout son={<Users/>}/>}/>
        <Route path='/product' element={<DefaultLayout son={<Products/>}/>}/>
        <Route path='/order' element={<DefaultLayout son={<Orders/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
