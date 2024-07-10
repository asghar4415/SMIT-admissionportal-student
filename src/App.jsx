import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRoute from './routes/authRoutes';
import ProtectedRoute from './routes/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import OtpVerifyPage from './pages/auth/OtpVerify';
import UpdateProfile from './pages/Dashboard/updateProfile'; // Import the UpdateProfile component
import CourseEnrollment from './pages/Dashboard/courseEnrollment'; // Import the CourseEnrollment component
import NotificationPanel from './pages/Dashboard/notificationPanel'; // Import the NotificationPanel component

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route element={<AuthRoute />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </Route>

        {/* Public Route for Dashboard */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/updateProfile' element={<UpdateProfile />} />
        <Route path='/courseEnrollment' element={<CourseEnrollment />} />
        <Route path='/notificationPanel' element={<NotificationPanel />} />

        {/* Other routes that are still protected */}
        <Route element={<ProtectedRoute />}>
          <Route path='/auth/otp-verify' element={<OtpVerifyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
