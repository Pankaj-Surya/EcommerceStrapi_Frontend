import React from 'react'
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '../../redux/cartReducer';
import { makeRequest } from '../../makeRequest';
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Cart = () => {
  // const products = [
  //   {
  //     id:1,
  //     img:"https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto-compress&cs-tinysrgb&w=1600",
  //     img2:"https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto-compress&cs-tinys",
  //     title:"Long Sleeve Graphic T-shirt",
  //     isNew:true,
  //     desc:"this is a description of the",
  //     oldPrice:19,
  //     price:12,
  //   },
  //   {
  //     id:2,
  //     img:"https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto-compress&cs=tinysrgb&w=1600",
  //     title:"Coat",
  //     isNew:true,
  //     desc:"this is a description of the",
  //     oldPrice:19,
  //     price:12,
  //   },
  //   {
  //     id:3,
  //     img:"https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto-compress&cs-tinys",
  //     title:"Skirt",
  //     desc:"this is a description of the",
  //     oldPrice:19,
  //     price:12,
  //   },
  //   {
  //     id:4,
  //     img:"https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto-compress&cs-tinys",
  //     title:"Hat",
  //     desc:"this is a description of the",
  //     oldPrice:19,
  //     price:12,
  //   },
  // ]
  const products = useSelector(state=>state.cart.products)
  const user = useSelector(state=>state.user.currentUser);
  console.log("user",user);
  console.log("prod",products)
  const navigate = useNavigate();
  //console.log("sssssss")
  const dispatch = useDispatch();
  function totalPrice(){
   let total =0;
   products.forEach((item)=>{
    total+=item.price*item.quantity;
   }) 
   return total.toFixed(2);
  }

  const stripePromise = loadStripe(
    "pk_test_51MJe8TSFYzfchjAqFi5aMkAeDEQrx3luGPDX7unVvGW8t30haGc6foLAqvyABXtVTcIX8UMCv5f9ni8NmDoMhLtN00yto5fy0i"
  );


  const handlePayment = async () => {
    if(!user){
      navigate("/login");
    }else{
      try {
        const stripe = await stripePromise;
        const res = await makeRequest.post("/orders", {
          products,
          email : user.email 
        });
        console.log(res)
        await stripe.redirectToCheckout({
          sessionId: res.data.stripeSession.id,
        });
       
      } catch (err) {
        console.log(err);
      }
      //dispatch(resetCart());
    }   
   
  };
  return (
    <div className='cart'>
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title.length>5 ? item.title.slice(0,10)+".." : item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
            {item.quantity} x ${item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={()=>dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button onClick={handlePayment} >PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={()=>dispatch(resetCart())}>
        Reset Cart
      </span>
    
    </div>
  )
}

export default Cart