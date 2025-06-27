import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  console.log(udata);

  const adddata = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
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

  const res = await fetch("http://localhost:8006/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fname, email, mobile, password, cpassword }),
    credentials:"include",
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
  }
};


  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="/images/blacklogoamazon.png" alt="amazonlogo" />
        </div>

        <div className="sign_form">
          <form method="POST">
            <h1>Sign-Up</h1>

            <div className="form_data">
              <label htmlFor="fname">Your name</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.fname}
                name="fname"
                id="fname"
              />
            </div>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.email}
                name="email"
                id="email"
              />
            </div>

            <div className="form_data">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.mobile}
                name="mobile"
                id="mobile"
              />
            </div>

            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={udata.password}
                name="password"
                placeholder="At least 6 char"
                id="password"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input
                type="password"
                onChange={adddata}
                value={udata.cpassword}
                name="cpassword"
                id="cpassword"
              />
            </div>
            <button className="signin_btn" onClick={senddata}>
              Continue
            </button>

            <div className="sign_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Signin</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SignUp;
