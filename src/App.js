import './App.css';
import Header from './Header';
import Offers from './Offers';
import Products from './Products';
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <>
    <Header/>
    <Offers/>
    <Products/>
    </>
  );
}
export default App;


