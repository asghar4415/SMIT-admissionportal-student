import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import "../../../App.css"
import "./signup.css"
import Slider from "../../../components/Slider";
import OrbitingText from "../../../components/OrbitingText";
const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {



  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnic: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnic: "",
  });

  
  useEffect(() => {
    if(window.location.reload())
    {
      navigate("/auth/register");
    }
  }, []);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCNIC = (cnic) => {
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
    return cnicRegex.test(cnic);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
    }));

    if (name.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        name: "Name is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: "",
      }));
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email,
    }));

    if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData((prev) => ({
      ...prev,
      password,
    }));

    const result = zxcvbn(password);
    setPasswordStrength(result.score);

    if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setFormData((prev) => ({
      ...prev,
      confirmPassword,
    }));

    if (confirmPassword !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }
  };

  const handleCnicChange = (e) => {
    const cnic = e.target.value;
    setFormData((prev) => ({
      ...prev,
      cnic,
    }));

    if (!validateCNIC(cnic)) {
      setErrors((prev) => ({
        ...prev,
        cnic: "Invalid CNIC format",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        cnic: "",
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name) {
      alert("Please enter your name.");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character."
      );
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!validateCNIC(formData.cnic)) {
      alert("Please enter a valid CNIC.");
      setLoading(false);
      return;
    }

    try {
      const registerRsp = await axios.post(
        `${apiUrl}/api/auth/register`,
        formData
      );

      if (registerRsp.data.status === false) {
        toast.error(`CNIC or email Already Exists.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
      }
      else
      {
        toast.success(`Thankyou for Signing up.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/auth/login");
      }
      
    } catch (err) {
      toast.error(`CNIC or email Already Exists.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex xl:gap-x-[7rem] items-center h-screen signup-page">
      <div className="relative lg:w-[35%] xl:w-[30%] lg:flex lg:flex-col lg:gap-10 hidden bluebg text-white m-10 h-[95vh] rounded-2xl">
        <div className="mt-5">
          <Slider />
        </div>

        <div className="ps-7 text-gray-200">
          <h2
            className="lg:text-[1.5rem] xl:text-[2rem] font-bold"
            style={{
              lineHeight: "1.4",
              fontFamily: "Arsenal SC",
              marginTop: "-1.5rem"
            }}
          >
            Welcome to Saylani
            <br /> Mass IT training program
          </h2>
          <p
            className="lg:w-[80%] xl:w-[60%] lg:mt-5 lg:text-[1rem] xl:text-[1rem] font-bold"
            style={{
              lineHeight: "1.2",
              fontFamily: "Arsenal SC",

            }}
          >
            Register yourself and get started.
          </p>
        </div>

        <div className="w-[150px] p-0 absolute bottom-0 ">
          <OrbitingText color="white" />
        </div>
      </div>


      <div className="w-[90%] m-auto sm:w-fit   lg:m-0">
        <div className="head-1">
          <img src="/img/bg-removed.png" alt="" className="small-img" />
          <h1 className="small-head"
          >Welcome to SMIT</h1>

        </div>
        <h1 className="text-3xl font-semibold login-logo big-img">
          <img src="/img/bg-removed.png" alt="" />
        </h1>
        <h1 className="text-4xl font-semibold mb-1"
          style={{
            fontFamily: "Arsenal SC",
          }}>Signup</h1>
        <p className="mb-[2rem] font-bold text-sm lg:w-[80%] xl:w-[100%]">

        </p>
        <form onSubmit={submitHandler} className=" lg:w-[50vw] w-[100%]">
          <div className="w-full flex flex-col gap-y-11 sm:flex-row gap-2 min-h-[6rem]">
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="name"
                className="block text-gray-600 font-bold text-sm"
                style={{ fontFamily: "Arsenal SC" }}
              >
                NAME
              </label>
              <input
                type="text"
                style={{ fontFamily: "Arsenal SC" }}
                disabled={loading}
                id="name"
                name="name"
                className={`w-[100%] border ${errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                placeholder="John Doe"
                onChange={handleNameChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="email"
                className="block text-gray-600 font-bold text-sm email-1"
                style={{ fontFamily: "Arsenal SC" }}
              >
                Email
              </label>
              <input
                type="text"
                disabled={loading}
                style={{
                  fontFamily: "Arsenal SC",

                }}
                id="email"
                name="email"
                className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                placeholder="abc123@gmail.com"
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-2 min-h-[6rem]">

            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="cnic"
                className="block text-gray-600 font-bold text-sm cnic-1"
                style={{
                  fontFamily: "Arsenal SC",

                }}
              >
                CNIC
              </label>
              <input
                type="text"
                disabled={loading}
                id="cnic"
                name="cnic"
                style={{
                  fontFamily: "Arsenal SC",

                }}
                className={`w-[100%] border ${errors.cnic ? "border-red-500" : "border-gray-300"
                  } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                placeholder="XXXXX-XXXXXXX-X"
                onChange={handleCnicChange}
              />
              {errors.cnic && (
                <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>
              )}
            </div>
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="password"
                className="block text-gray-600 font-bold text-sm"
                style={{
                  fontFamily: "Arsenal SC",
                }}
              >
                Password
              </label>
              <input
                type="password"
                disabled={loading}
                id="password"
                name="password"
                className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <div className="mt-2">
                <div
                  className={`h-2 rounded-full ${passwordStrength === 0
                    ? "bg-gray-100"
                    : passwordStrength === 1
                      ? "bg-red-500"
                      : passwordStrength === 2
                        ? "bg-yellow-500"
                        : passwordStrength === 3
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  style={{ width: `${(passwordStrength + 1) * 20}%` }}
                ></div>
                <p className="text-gray-600 text-sm">
                  Password strength: {passwordStrength ? passwordStrength : 0}/4
                </p>
              </div>
            </div>


          </div>

          <div className="w-full flex flex-col mt-1 sm:flex-row gap-2 min-h-[6rem]">
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 font-bold text-sm"
                style={{
                  fontFamily: "Arsenal SC",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                disabled={loading}
                id="confirmPassword"
                name="password"
                value={formData.confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder="Confirm your password"
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-gray-300"

              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="mt-1 flex justify-center  m-auto">
            <button
              type="submit"
              disabled={loading}
              style={{
                fontFamily: "Arsenal SC",
                fontSize: "1.2rem",

              }}
              className="bluebg w-full text-white font-semibold rounded-md py-2 px-4  "
            >
              {loading ? "loading" : "Signup"}
            </button>
          </div>
        </form>
        <div className="signup-button-bottom" disabled={loading}>
          <p>Signed up already? &nbsp; </p>

          <Link to="/auth/login" className=" text-blue-500 underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
