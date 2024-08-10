import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isVerified, setLoading } from '../state/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const AuthRoute = () => {
  const navigate= useNavigate()
  const dispatch =useDispatch()
  const {loading,verified}=useSelector((state)=>state.userReducer)
  const pageNav =()=>{
    if(isVerified){
      dispatch(setLoading(true))
      dispatch(isVerified(true))
      navigate("/")

    }
  }
  try{
    
    useEffect(()=>{
      dispatch(setLoading(true))
      const token =localStorage.getItem("token");
      if(token){
        const verifyUser =async()=>{
         const isverified= await axios.get(`${apiUrl}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          });
        if(localStorage.getItem("token")){
          console.log("mae andr hon auth")
          if(isverified?.data?.status===false && isverified?.data?.email){
            navigate("/auth/otp-verify")
            return
          }
          
        }
          
        }
        dispatch(setLoading(false));
        dispatch(isVerified(true));
        pageNav()
        
       
      }
      else{
        dispatch(isVerified(false));
        dispatch(setLoading(false))
      }
     
    },[localStorage.getItem("token")])

  }catch(err){
    dispatch(isVerified(false));
    dispatch(setLoading(false))
  }


  return loading?(<Loader/>):(verified?("already logged in"):<Outlet/>)
}

export default AuthRoute