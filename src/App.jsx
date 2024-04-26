import './App.css';
import './data.js';

import MainContainer from './components/MainContainer';
import ProductsContainer from './components/ProductsContainer';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import Header from './components/Header';

export default function App() {
  return (
    <AnimatePresence mode="wait">
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header />
      <main className='mt-14 md:mt-24 px-16 py-4 pt-8 w-full h-full'>
        <Routes>
              <Route exact path="/*" element={<MainContainer/>} />
              <Route exact path="/Dishes" element={<ProductsContainer products={Dishes}/>} />
              <Route exact path="/Drinks" element={<ProductsContainer products={Drinks}/>} />
              <Route exact path="/Desserts" element={<ProductsContainer products={Desserts}/>} />
        </Routes>
      </main>
    </div>
    </AnimatePresence>
  );
}
