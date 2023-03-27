import axios from 'axios'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Card from '../Card/Card'
import "./FeaturedProducts.scss"

const FeaturedProducts = ({ type }) => {

  
  // const { data, loading, error } = useFetch(
  //   `/products?populate=*&[filters][type][$eq]=${type}`,type
  // );

  // console.log("data",data)
  // console.log("type",type)

  // /products?populate=*&[filters][type][$eq]=${type}
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

  const path = `/products?populate=*&[filters][type][$eq]=${type}`
  useEffect(() => {
   const fetchData = async () =>{
     try {
      setLoading(true);
      const res =await axios.get(process.env.REACT_APP_API_URL+path, {
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

  return (
    <div className='featuredProducts'>
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque expedita est recusandae repudiandae sit ad animi quibusdam! Expedita hic, aspernatur neque quod ipsum illo nesciunt dolor vitae explicabo. Maiores necessitatibus alias voluptatem. At incidunt, earum inventore perspiciatis aliquid dolore suscipit saepe sint eius ea a iste dignissimos ab aut vitae rerum recusandae vel sed reiciendis dicta quia deleniti illum ratione?
        </p>
      </div>
      <div className="bottom">
        {error ? "something went wrong" : (loading ? "loading..." :
        data?.map(item => (
          <Card item={item} key={item.id} />
        )))}
      </div>
    </div>
  )
}

export default FeaturedProducts