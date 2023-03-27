import axios from "axios"

export const makeRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
       Authorization: "bearer"+ process.env.REACT_APP_API_TOKEN,
    },
  });

  //console.log("first", process.env.REACT_APP_API_URL)
  //console.log("fsssst", process.env.REACT_APP_API_TOKEN)


  