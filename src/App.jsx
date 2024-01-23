import {BrowserRouter, Routes, Route} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import City from "./components/City.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path='product' element={<Product/>}/>
                <Route path='pricing' element={<Pricing/>}/>
                <Route path='app' element={<AppLayout/>}>
                    <Route index element={<City/>}/>
                    <Route path='cities' element={<City/>}/>
                    <Route path='countries' element={<p>Countries</p>}/>
                    <Route path='form' element={<p>Form</p>}/>
                </Route>
                <Route path='login' element={<Login/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
