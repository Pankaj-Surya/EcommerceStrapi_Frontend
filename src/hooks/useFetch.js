import axios from "axios";
import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log("usrl",url)
 
  useEffect(() => {
   try {
    const getData = async() =>{
      const res =await axios.get(process.env.REACT_APP_API_URL+`/products?populate=*`, {
        headers: {
          Authorization: "bearer" + process.env.REACT_APP_API_TOKEN
        }
      })
      console.log("Data : ", res)
      setData(res.data.data)
     }
    
     getData(); 
    } catch (error) {
      console.log(error)
    }
  }, [])
  return { data, loading, error };
};


async function  getLoad( ){
  const res =await axios.get(process.env.REACT_APP_API_URL+`/products?populate=*`, {
    headers: {
      Authorization: "bearer" + process.env.REACT_APP_API_TOKEN
    }
  })
}

getLoad();


export default useFetch;