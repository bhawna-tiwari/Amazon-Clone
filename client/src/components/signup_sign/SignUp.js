import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css"; // Make sure this CSS file exists

const SignUp = () => {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const adddata = (e) => {
    const { name, value } = e.target;
    setUdata((prev) => ({ ...prev, [name]: value }));
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;

    if (!fname || !email || !mobile || !password || !cpassword) {
      toast.warn("Please fill all fields", { position: "top-center" });
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords do not match", { position: "top-center" });
      return;
    }

    try {
      const res = await fetch("https://your-backend-url.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fname, email, mobile, password, cpassword }),
      });

      const data = await res.json();

      if (!res.ok || res.status === 422) {
        toast.warn(data?.error || "Invalid details", {
          position: "top-center",
        });
      } else {
        toast.success("Successfully registered!", {
          position: "top-center",
        });
        setUdata({
          fname: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        });
        setTimeout(() => navigate("/login"), 1500); // redirect after delay
      }
    } catch (error) {
      toast.error("Server error. Try again later!", {
        position: "top-center",
      });
      console.error("Registration error:", error);
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="/images/blacklogoamazon.png" alt="Amazon Logo" />
        </div>

        <div className="sign_form">
          <form method="POST" onSubmit={senddata}>
            <h1>Sign-Up</h1>

            <div className="form_data">
              <label htmlFor="fname">Your name</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.fname}
                name="fname"
                id="fname"
                required
              />
            </div>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={adddata}
                value={udata.email}
                name="email"
                id="email"
                required
              />
            </div>

            <div className="form_data">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="tel"
                onChange={adddata}
                value={udata.mobile}
                name="mobile"
                id="mobile"
                required
              />
            </div>

            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={udata.password}
                name="password"
                id="password"
                placeholder="At least 6 characters"
                required
              />
            </div>

            <div className="form_data">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                onChange={adddata}
                value={udata.cpassword}
                name="cpassword"
                id="cpassword"
                required
              />
            </div>

            <button type="submit" className="signin_btn">
              Continue
            </button>

            <div className="sign_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SignUp;
