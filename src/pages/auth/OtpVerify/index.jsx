import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { isVerified, setLoading, setotpVerified} from '../../../state/userSlice';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
import "./style.css";
import { WindowSharp } from '@mui/icons-material';


const OtpVerifyPage = ({verified}) => {
  const dispatch = useDispatch()
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate()
  const {email} = useSelector((state) => state.userReducer);



  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/verifyotp`,
        { id: email, otp },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);
      setStatus(response.data.status ? 'success' : 'error');
      dispatch(setLoading(false));

      if(response.data.status){
        dispatch(setotpVerified(true))
        return
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setStatus('error');
    }
  };

  const handleResendOtp = async () => {
    try {
      const resp =await axios.post(
        `${apiUrl}/api/auth/resend-otp`,
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage('OTP has been resent to your email.');
      setStatus('success');
    } catch (error) {
      setMessage('An error occurred while resending OTP. Please try again.');
      setStatus('error');
    }
  };

  const handleOtpComponent = () => {
    window.location.reload()
  }


  return (
    <div className="h-fit bg-gray-100 flex ">
      <div className="otppage-close">
                    <span role="img" aria-label="close" onClick={handleOtpComponent}>❌</span>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
     
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">Enter OTP sent to your email:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Verify OTP
          </button>
        </form>
        <button
          onClick={handleResendOtp}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Resend OTP
        </button>
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpVerifyPage;
