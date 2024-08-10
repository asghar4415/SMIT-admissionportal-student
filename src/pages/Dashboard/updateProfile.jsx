import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import ProfilePic from "/img/profile.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import AvatarEditor from 'react-avatar-editor';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar';
import "../../components/sidebar.css";
import "./style1.css";
import { isVerified, setotpVerified,updateRegion, updateEmail, updateImgUrl, updateName } from "../../state/userSlice";
import OtpVerifyPage from '../auth/OtpVerify';


const apiUrl = import.meta.env.VITE_API_URL;

const cityOptions = [
  { value: 'karachi', label: 'Karachi' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'islamabad', label: 'Islamabad' },
  { value: 'lahore', label: 'Lahore' },
  // More cities...
];

const qualificationOptions = [
  { value: 'highSchool', label: 'High School' },
  { value: 'bachelor', label: 'Bachelor\'s Degree' },
  { value: 'master', label: 'Master\'s Degree' },
  { value: 'phd', label: 'PhD' },
  { value: 'other', label: 'Other' },
];

const UpdateProfile = () => {
  const dispatch = useDispatch();


  const token = localStorage.getItem("token");
  const cnic = JSON.parse(atob(token.split(".")[1])).cnic;
  const [stdDetails, setStdDetails] = useState({
    fullName: "",
    fatherName: "",
    cnic: cnic,
    email: "",
    password: "",
    city: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    lastQualification: "",
    laptop: false,
    img: ""
  });

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageScale, setImageScale] = useState(1);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [editingImage, setEditingImage] = useState(false);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const {otpverified} = useSelector((state) => state.userReducer);
// console.log("otpverified",otpverified)
const [showOtpPage, setShowOtpPage] = useState(false);



  useEffect(() => {
    const getUserData = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/getUserData/${cnic}`);
        setStdDetails({
          fullName: resp.data.fullName || "",
          fatherName: resp.data.fatherName || "",
          cnic: resp.data.cnic || "",
          email: resp.data.email || "",
          password: resp.data.password || "",
          city: resp.data.city || "",
          phone: resp.data.phone || "",
          date_of_birth: resp.data.date_of_birth || "",
          gender: resp.data.gender || "",
          address: resp.data.address || "",
          lastQualification: resp.data.lastQualification || "",
          laptop: resp.data.laptop || false,
          img: resp.data.img
        });
        setImageUrl(resp.data.img || null);

        dispatch(updateName(resp.data.fullName))
      dispatch(updateImgUrl(resp.data.img))
        dispatch(updateEmail(resp.data.email))
        dispatch(updateRegion(resp.data.city))
      const verifyUser =async()=>{
        try{
          const isverified= await axios.get(`${apiUrl}/userOtpVerified/${resp.data.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          });
          // console.log(isverified.data.status)
          if(isverified.data.status){
            dispatch(setotpVerified(true))
          }
          
        }catch(err){
          console.log("error",err)
        }
        }
        verifyUser()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getUserData();
  }, [cnic]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStdDetails(prevDetails => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setStdDetails(prevDetails => ({
      ...prevDetails,
      [name]: selectedOption ? selectedOption.value : ""
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setEditingImage(true);
  };

  const handleScaleChange = (e) => {
    setImageScale(parseFloat(e.target.value));
  };

  const handleRotate = () => {
    setRotateAngle((prev) => (prev + 90) % 360);
  };

  const saveCroppedImage = () => {
  
    if (editorRef.current) {
      try {
        const canvas = editorRef.current.getImageScaledToCanvas();
        canvas.toBlob((blob) => {
          if (blob) {

            setImageFile(blob);
            setImageUrl(URL.createObjectURL(blob));
            setEditingImage(false);
          }
        });
      } catch (error) {
        console.error("Error saving the image:", error);
        toast.error("Cannot save the image due to cross-origin restrictions.");
      }
    }
  };
// console.log(imageFile,imageUrl)
  const closeEditing = () => {
    saveCroppedImage();
    setEditingImage(false);
  };

  const checkBlueBackground = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = function (e) {
        img.src = e.target.result;
  
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);

  
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
          const bluePixelThreshold = 0.5; // Adjust this value based on your requirement
  
          let bluePixels = 0;
          let totalPixels = imageData.length / 4;
  
          for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
  
            if (b > 180 && r < 150 && g < 200) {
              bluePixels++;
            }
            
            
          }
          const blueRatio = bluePixels / totalPixels;
          resolve(blueRatio > bluePixelThreshold);
        };
  
        img.onerror = function () {
          reject('Image loading failed');
        };
      };
  
      reader.onerror = function () {
        reject('Image reading failed');
      };
  
      reader.readAsDataURL(imageFile);
    });
  };


  const uploadImage = async (imageFile) => {

    // console.log("imageFile",imageFile)
    if (!imageFile) {
      // console.error('No image file to upload.');
      return null;
    }

    const maxSizeInBytes = 200 * 1024; 
  if (imageFile.size > maxSizeInBytes) {
    toast.error('Image file is too large. Must be less than 200 KB.');
    // console.error('Image file is too large. Must be less than 200 KB.');
    return null;
  }
  const hasBlueBackground = await checkBlueBackground(imageFile);
  if (!hasBlueBackground) {
    return null;
  }
  
    const formData = new FormData();
    formData.append('file', imageFile);
  
    try {
      const response = await axios.post(`${apiUrl}/api/uploadimage`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data[0]; // Assuming response contains the uploaded image info
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  

  

  const otpVerification = async () =>
  {
    try{
      const resp = await axios.post(`${apiUrl}/api/auth/resend-otp`, { email: stdDetails.email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      // console.log("resp",resp)
    }
    catch(err){
      console.log("error",err)
    }
  setShowOtpPage(true);
  
  }

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
  }

  const handleSubmit = async () => {
    setLoading(true);
    if (otpverified === false) {
      toast.error("Please verify your email first");
      otpVerification();
     
      if(otpverified === true){
        setShowOtpPage(false);
      }
      setLoading(false);
      return;
    }
    try {
      let uploadedImageUrl = imageUrl;

      if (imageFile) {
        uploadedImageUrl = await uploadImage(imageFile);
       
        stdDetails.img = uploadedImageUrl;
        if(uploadedImageUrl == null ){
          toast.error("Image does not have a blue background.");
          return;
        }
      
      }

      if(!validatePhoneNumber(stdDetails.phone)){
        toast.error("Please enter a valid phone number");
        return;
      }


      
      const updatedDetails = { ...stdDetails, img: uploadedImageUrl };
      const resp = await axios.post(`${apiUrl}/updateUserData`, updatedDetails);

      toast.success("Profile updated successfully");

    } catch (error) {
      // console.log("error chalaa",error  )
     
      toast.error("Error updating profile");
      // console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const setPicture = ()=>{
    if(imageFile){
      return imageFile
    }
    else{
      return ProfilePic
    }
  }

  const setPicture2 = ()=>{

    if(imageUrl == null || imageUrl.length > 0){ 
      return imageUrl
    }
    else{
      return ProfilePic
    }
  }
  return (
    
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-2">
      <Sidebar />
      <div className='relative flex-1'>
      {showOtpPage && (
          <div className="absolute inset-0 bg-gray-400  bg-opacity-50 flex justify-center items-center z-50">
            <OtpVerifyPage  />
          </div>
        )}
      <div className="flex-1 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <ToastContainer />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 mt-7">
          <div className="md:col-span-1 flex flex-col items-center checkkk">
            <div className="relative">
              {editingImage ? (
                <AvatarEditor
                  ref={editorRef}
                  image={setPicture()}
                  width={200}
                  height={200}
                  border={50}
                  color={[255, 255, 255, 0.6]}
                  scale={imageScale}
                  rotate={rotateAngle}
                  className="rounded-full"
                  crossOrigin="anonymous"
                />
              ) : (
                <img
                  src={setPicture2()}
                  alt="Profile"
                  className="rounded-full md:w-52 md:h-52 w-32 h-32"
                 
                />
              )}
              {editingImage && (
                <>
                  <div className="absolute bottom-2 right-2 bg-gray-200 rounded-full p-2 cursor-pointer" onClick={saveCroppedImage}>
                    <span role="img" aria-label="save">💾 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 cursor-pointer" onClick={closeEditing}>
                    <span role="img" aria-label="close">❌</span>
                  </div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="mt-2"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              <label htmlFor="fileInput" className="absolute bottom-2 right-2 bg-gray-200 rounded-full p-2 cursor-pointer">
                <span role="img" aria-label="edit"  onClick={() => fileInputRef.current.click()}>✏️</span>
              </label>
            </div>
            {editingImage && (
              <div className="flex mt-2">
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={imageScale}
                  onChange={handleScaleChange}
                />
                <button onClick={handleRotate} className="ml-2 bg-gray-200 p-2 rounded-md">↻</button>
              </div>
            )}
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-6 md:pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
                value={stdDetails.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
                value={stdDetails.fatherName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">CNIC Number</label>
            <input
              type="text"
              name="cnic"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              value={stdDetails.cnic}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              value={stdDetails.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              value={stdDetails.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              value={stdDetails.date_of_birth}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              value={stdDetails.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              value={stdDetails.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Qualification</label>
            <Select
              name="lastQualification"
              options={qualificationOptions}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              value={qualificationOptions.find(option => option.value === stdDetails.lastQualification)}
              onChange={handleSelectChange}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <Select
              name="city"
              options={cityOptions}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              value={cityOptions.find(option => option.value === stdDetails.city)}
              onChange={handleSelectChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you have a laptop?</label>
            <div className="flex items-center mt-1">
              <label className="mr-2">
                <input
                  type="radio"
                  name="laptop"
                  value="yes"
                  checked={stdDetails.laptop === true}
                  onChange={() => setStdDetails(prevDetails => ({ ...prevDetails, laptop: true }))}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="laptop"
                  value="no"
                  checked={stdDetails.laptop === false}
                  onChange={() => setStdDetails(prevDetails => ({ ...prevDetails, laptop: false }))}
                /> No
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 w-full rounded-md hover:bg-blue-700 submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
