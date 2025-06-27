import React, { useContext, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import "./cart.css";
import { useNavigate, useParams } from "react-router-dom";
import { Logincontext } from "../context/Contextprovider";
import CircularProgress from '@mui/material/CircularProgress';

const Cart = () => {
  const { id } = useParams();
  const history = useNavigate();
  const { account, setAccount } = useContext(Logincontext);
  const [inddata, setIndedata] = useState("");

  const getinddata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("no data available");
    } else {
      console.log("ind mila hain");
      setIndedata(data);
    }
  };

  useEffect(() => {
    setTimeout(getinddata, 1000);
  }, [id]);

  // Add to cart
  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inddata }),
      credentials: "include",
    });

    const data1 = await checkres.json();

    if (checkres.status === 401 || !data1) {
      console.log("user invalid");
      alert("no data available");
    } else {
      history("/buynow");
      setAccount(data1);
    }
  };

  return (
    <div className="cart_section">
      {inddata ? (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata?.detailUrl} alt="cart_img" />
            <div className="cart_btn">
              <button
                className="cart_btn1" onClick={() => addtocart(inddata.id)}> Add to Cart </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>

          <div className="right_cart">
            <h3>{inddata?.title?.shortTitle}</h3>
            <h4>{inddata?.title?.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P. : <del>₹{inddata?.price?.mrp}</del>
            </p>
            <p>
              Deal of the Day :
              <span style={{ color: "#B12704" }}> ₹{inddata?.price?.cost}.00</span>
            </p>
            <p>
              You save :
              <span style={{ color: "#B12704" }}>
                ₹{(inddata?.price?.mrp || 0) - (inddata?.price?.cost || 0)} (
                {inddata?.price?.discount})
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :
                <span style={{ color: "#111" }}>{inddata?.discount}</span>
              </h5>
              <h4>
                Free Delivery :
                <span style={{ color: "#111", fontWeight: 600 }}> jan-8-25</span>
                Details
              </h4>
              <p>
                Fastest Delivery :
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tomorrow 11AM
                </span>
              </p>
            </div>
            <p className="description">
              About the Item :
              <span
                style={{
                  color: "#565959",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.4px",
                }}
              >
                {inddata?.description}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
