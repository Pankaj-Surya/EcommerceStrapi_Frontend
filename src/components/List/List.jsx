import { Skeleton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import "./List.scss"

const List = ({ subCats, maxPrice, sort, catId }) => {
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  //console.log("sort", sort)
  const path = `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
    (item) => `&[filters][sub_categories][id][$eq]=${item}`
  )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  //`/products?populate=*&filters[categories][id][$eq]=${catId}${subCats.map(item=>
  //`&[filters][sub_categories][id][$eq]=${item}`)}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
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



  return (
    <div className='list'>
      {
        loading ?
          data?.forEach(()=> (
            <Skeleton variant="rectangular" width={210} height={118} />
          ))
          :
          data?.map(item => (
            <Card item={item} key={item.id} />
          ))
      }
    </div>
  )
}

export default List