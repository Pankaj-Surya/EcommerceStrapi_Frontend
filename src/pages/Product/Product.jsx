import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Product.scss"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';


const Product = () => {

  const [selectedImg, setSelectedImg] = useState(0)
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  // const images = [
  //   "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto-compress&cs=tinysrgb&w=1600",
  //   "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto-compress&cs-tinys"
  // ]
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const id = useParams().id;

  const path = `/products/${id}?populate=*`

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(process.env.REACT_APP_API_URL + path, {
          headers: {
            Authorization: "bearer" + process.env.REACT_APP_API_TOKEN
          }
        })
        //console.log("Data : ", res)
        setData(res.data.data)
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }
    fetchData()
  }, [path])

  const ImgPath = [process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url, process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url]
  //console.log("data", data)

  const handleAddToCart = () => {
    //console.log("click")
    dispatch(addToCart(
      {
        id: data?.id,
        title: data.attributes.title,
        desc: data.attributes.desc,
        price: data.attributes.price,
        img: data.attributes.img.data.attributes.url,
        quantity: quantity
      }
    ))
  }
  return (
    loading ? "products is loading...." : (<>
      <div className='product'>
        <div className="left">
          <div className="images">
            <img src={ImgPath[0]} alt="" onClick={(e) => setSelectedImg(0)} />
            <img src={ImgPath[1]} alt="" onClick={(e) => setSelectedImg(1)} />
          </div>
          <div className="mainImg">
            <img src={ImgPath[selectedImg]} alt="" />
          </div>
        </div>
        <div className="right">
          <h1>{data?.attributes?.title}</h1>
          <span className="price">${data?.attributes?.price}</span>
          <p>{data?.attributes?.desc}.</p>
          <div className="quantity">
            <button
              onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>
              -
            </button>
            {quantity}
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>
          <button className='add'  onClick={() => { handleAddToCart() }}><AddShoppingCartIcon
            /> ADD TO CART</button>
          <div className="links">
            <div className="item">
              <FavoriteBorderIcon /> ADD TO WISH LIST
            </div>
            <div className="item">
              <BalanceIcon /> ADD TO COMPARE
            </div>
          </div>
          <div className="info">
            <span>Vendor: Polo</span>
            <span>Product Type: T-Shirt</span>
            <span>Tag: T-Shirt, Women, Top</span>
          </div>
          <hr />
          <div className="info">
            <span>DESCRIPTION</span>
            <hr />
            <span>ADDITIONAL INFORMATION</span>
            <hr />
            <span>FAQ</span>
          </div>
        </div>
      </div>
    </>)
  )
}

export default Product