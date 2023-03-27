import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./authReducer"

export const loginCall = async (dispatch, user) => {
     console.log(user)
      dispatch(loginStart());
      console.log("api call start")
      try {
        const identifier=user.identifier;
        const password =user.password;
        console.log(identifier, password);
        console.log("api called")
        //const res = await publicRequest.post("/auth/login", {username : username, password : password});
        const res =await axios.post('http://localhost:1337/api/auth/local', {
        identifier: user.identifier,
        password: user.password,
      })
        console.log("res : ",res)
        dispatch(loginSuccess(res.data.user));
        console.log("login success")
        return
      } catch (err) {
        console.log("loginFailure api : ",err)
        dispatch(loginFailure());
      }
    };
  