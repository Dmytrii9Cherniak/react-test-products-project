import React from 'react';
import ProductList from './components/ProductList/ProductList';
import {Header} from "./components/header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import NewProduct from "./components/new_product/NewProduct";

function App() {
  return (
    <div className="app">
        <Header/>
        <Routes>
            <Route path="/" element={<Navigate to="/products"/>} />
            <Route path="/products" element={<ProductList/>} />
            <Route path="/new" element={<NewProduct/>} />
        </Routes>
    </div>
  );
}

export default App;
