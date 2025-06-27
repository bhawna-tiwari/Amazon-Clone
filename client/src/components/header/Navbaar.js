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
  const [text, setText] = useState();
  const { products } = useSelector((state) => state.getproductsdata);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [liopen, setLiopen] = useState(true);
  const [dropen, setDropen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { account, setAccount } = useContext(Logincontext);

  const getdetailsvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (res.status !== 201) {
      console.log("First login");
    } else {
      setAccount(data);
    }
  };

  useEffect(() => {
    getdetailsvaliduser();
  }, []);

  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    if (!res2.status === 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      setAccount(false);
      setOpen(false);
      toast.success("User Logout 😃!", {
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
          <div className="nav_btn">
            <NavLink to="/login">Signin</NavLink>
          </div>

          {account ? (
            <NavLink to="/buynow">
              <div className="cart_btn">
                
                  <i className="fas fa-shopping-cart" id="icon"></i>
                
                <p>Cart</p>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <div className="cart_btn">
                <Badge badgeContent={0} color="primary">
                <i className="fa-solid fa-cart-shopping"></i>
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          )}

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

