import React, { useState, useContext } from "react";
import "./signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logincontext } from "../context/Contextprovider";
import BASE_URL from "../../utils/BASE_URL";


const Sign_in = () => {
  const [logdata, setData] = useState({ email: "", password: "" });
  const { setAccount } = useContext(Logincontext);
  const navigate = useNavigate();

  const adddata = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    if (!email || !password) {
      toast.warn("Please fill all the fields!", { position: "top-center" });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        toast.warn("Invalid email or password", { position: "top-center" });
      } else {
        setAccount(data);
        toast.success("Login successful!", { position: "top-center" });
        setData({ email: "", password: "" });
        navigate("/"); // Redirect to home after login
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again!", {
        position: "top-center",
      });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="/images/blacklogoamazon.png" alt="amazonlogo" />
        </div>

        <div className="sign_form">
          <form method="POST" onSubmit={senddata}>
            <h1>Sign-In</h1>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={adddata}
                value={logdata.email}
                name="email"
                id="email"
                required
              />
            </div>

            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={logdata.password}
                name="password"
                id="password"
                placeholder="At least 6 characters"
                required
              />
            </div>

            <button type="submit" className="signin_btn">
              Continue
            </button>
          </form>
        </div>

        <div className="create_accountinfo">
          <p>New To Amazon?</p>
          <NavLink to="/signup">
            <button>Create your Amazon account</button>
          </NavLink>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Sign_in;
