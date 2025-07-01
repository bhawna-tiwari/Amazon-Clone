import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './rightheader.css';

const Rightheader = ({ userlog, Logclose }) => {
  const { account } = useContext(Logincontext);

  return (
    <div className="rightheader">
      <div className="right_nav">
        {account ? (
          <Avatar className="avtar2" title={account.fname.toUpperCase()}>
            {account.fname[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar className="avtar" />
        )}
        {account && <h3>Hello, {account.fname.toUpperCase()}</h3>}
      </div>

      <div className="nav_btn" onClick={Logclose}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Shop By Category</NavLink>
        <Divider style={{ width: "100%", marginLeft: -20 }} />
        <NavLink to="/" style={{ marginTop: 10 }}>Today's Deal</NavLink>

        <NavLink to={account ? "/buynow" : "/login"}>Your Orders</NavLink>

        <Divider style={{ width: "100%", marginLeft: -20 }} />

        <div className="flag">
          <NavLink to="#" style={{ marginTop: 14 }}>Settings</NavLink>
          <img src="/images/india.png" alt="Indiaflag" style={{ width: 35, marginLeft: 10 }} />
        </div>

        {account ? (
          <div className="flag">
            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
            <h3
              onClick={() => {
                userlog();
                Logclose();
              }}
              style={{ cursor: "pointer", fontWeight: 500 }}
            >
              Logout
            </h3>
          </div>
        ) : (
          <NavLink to="/login">Signin</NavLink>
        )}
      </div>
    </div>
  );
};

export default Rightheader;
