import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'
import { resetCart } from '../../redux/cartReducer'
import "./Home.scss"
const Home = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(window.location.href);
  //console.log(url);

  useEffect(() => {
    const msg = window.location.href.split("?")[1];
    console.log(msg);
    if (msg == "success=true") {
       //alert("Order Placed Syccessfully!");
      dispatch(resetCart());
    }
  }, [url]);
  return (
    <div className='home'>
      <Slider/>
      <FeaturedProducts type="featured"/>
      <Categories/>
      <FeaturedProducts type="trending"/>
      <Contact/>
    </div>
  )
}

export default Home
