import Navbaar from "./components/header/Navbaar";
import Newnav from "./components/newnavbaar/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/Footer/Footer";
import Signup from "./components/signup_sign/SignUp";
import Sign_in from "./components/signup_sign/Sign_in";
import Cart from "./components/Carts/Cart";
import Buynow from "./components/BuyNow/BuyNow";
import "./App.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbaar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Sign_in />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      )}
    </>
  );
}
export default App;
