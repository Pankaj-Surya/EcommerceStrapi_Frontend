import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss"
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authReducer";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

//https://raw.githubusercontent.com/safak/youtube2022/ecommerce/client/public/img/payment.png

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const products = useSelector((state) => state.cart.products)
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser)
  const navigate = useNavigate();
  //console.log(products)
  const handleLogout = () => {

    console.log("click")
    console.log(user)
    if (user) {
      dispatch(logout());
      navigate("/")
    }
  }

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="left">
          <div className="item" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src="https://raw.githubusercontent.com/safak/youtube2022/ecommerce/client/public/img/en.png" alt="" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>USD</span>
            <KeyboardArrowDownIcon />
          </div>


          <div className="item catDropDown">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Categories"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem ><a style={{textDecoration:"none",color:"black"}} href="/products/1/">Men</a></MenuItem>
                <MenuItem ><a style={{textDecoration:"none",color:"black"}} href="/products/2/">Women</a></MenuItem>
                <MenuItem ><a style={{textDecoration:"none",color:"black"}} href="/products/3/">Child</a></MenuItem>
              </Select>
            </FormControl>

          </div>


          <div className="item ">
            <Link className="link" to="/products/1"
            style={{ display: { xs: 'none', md: 'none', lg:"none"  }, mr: 1 }}
            >Women</Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/2">Men</Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/3">Children</Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">LAMASTORE</Link>
        </div>
        <div className="right">
          <div className="items">
            <Link className="link" >{user && ("Welcome " + JSON.stringify(user.username.toUpperCase()))}</Link>
          </div>
          {
            user ? (<div className="items">
              <Link className="link" to="/" onClick={handleLogout}>Logout</Link>
            </div>) : (<div className="items">
              <Link className="link" to="/login">Login</Link>
            </div>)
          }


          <div className="items">
            <Link className="link" to="/order">Order</Link>
          </div>
          <div className="icons">
            <SearchIcon className="hideIcon" />
            <PersonOutlineOutlinedIcon className="hideIcon" />
            <FavoriteBorderOutlinedIcon className="hideIcon" />
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products?.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  )
}

export default Navbar