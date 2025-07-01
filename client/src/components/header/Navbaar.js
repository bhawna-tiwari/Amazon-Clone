import React, { useContext, useEffect, useState } from "react";
import "../header/navbaar.css";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import { Logincontext } from "../context/Contextprovider";
import { ToastContainer, toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@mui/styles";
import { Drawer, IconButton, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Rightheader from "./Rightheader";
import { getProducts } from "../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import  BASE_URL  from '../../utils/BASE_URL' // ✅ import base URL

const useStyles = makeStyles({
  component: {
    marginTop: 10,
    marginRight: "-50px",
    width: "300px",
    padding: 50,
    height: "300px",
  },
});

const Navbaar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { products } = useSelector((state) => state.getproductsdata);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [liopen, setLiopen] = useState(true);
  const [dropen, setDropen] = useState(false);

  const { account, setAccount } = useContext(Logincontext);

  useEffect(() => {
    dispatch(getProducts());
    getdetailsvaliduser();
  }, [dispatch]);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getdetailsvaliduser = async () => {
    const res = await fetch(`${BASE_URL}/validuser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (res.status === 201) {
      setAccount(data);
    } else {
      console.log("Not logged in");
    }
  };

  const logoutuser = async () => {
    const res2 = await fetch(`${BASE_URL}/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    if (res2.status !== 201) {
      toast.error("Logout failed!", { position: "top-center" });
    } else {
      setAccount(false);
      setOpen(false);
      toast.success("User Logged Out 😃!", {
        position: "top-center",
      });
      navigate("/");
    }
  };

  const handelopen = () => {
    setDropen(true);
  };

  const handleClosedr = () => {
    setDropen(false);
  };

  const getText = (text) => {
    setText(text);
    setLiopen(false);
  };

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handleClosedr}>
            <Rightheader userlog={logoutuser} logclose={handleClosedr} />
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="/images/amazon_PNG25.png" alt="logo" />
            </NavLink>
          </div>

          <div className="nav_searchbaar">
            <input
              type="text"
              onChange={(e) => getText(e.target.value)}
              placeholder="Search Your Products"
            />
            <div className="search_icon">
              <i className="fas fa-search" id="search"></i>
            </div>

            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product, index) => (
                    <ListItem key={index}>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>

        <div className="right">
          {!account && (
            <div className="nav_btn">
              <NavLink to="/login">Signin</NavLink>
            </div>
          )}

          <NavLink to={account ? "/buynow" : "/login"}>
            <div className="cart_btn">
              <Badge
                badgeContent={account?.carts?.length || 0}
                color="primary"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Badge>
              <p>Cart</p>
            </div>
          </NavLink>

          {account && account.fname ? (
            <Avatar
              className="avtar2"
              onClick={handleClick}
              title={account.fname.toUpperCase()}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avtar" onClick={handleClick} />
          )}

          <div className="menu_div">
            <Menu
              anchorEl={open}
              open={Boolean(open)}
              onClose={handleClose}
              className={classes.component}
            >
              <MenuItem onClick={handleClose} style={{ margin: 10 }}>
                My account
              </MenuItem>

              {account && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logoutuser();
                  }}
                  style={{ margin: 10 }}
                >
                  <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />
                  Logout
                </MenuItem>
              )}
            </Menu>
          </div>

          <ToastContainer />
        </div>
      </nav>
    </header>
  );
};

export default Navbaar;

