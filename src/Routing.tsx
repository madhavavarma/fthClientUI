import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Login from "./components/login";
import Products from "./components/products";



export default function Routing() {
    return (
        <Router>
            <Routes >
                <Route path="/products" element={<Products />} />
                <Route path="" element={<Login />} />
            </Routes>
        </Router>
    )
}