import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterViewHistory from './pages/InterViewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'

export const backendServerUrl = import.meta.env.VITE_SERVER_URL

function App() {
    const dispatch = useDispatch()

      useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          backendServerUrl + '/api/user/currentUser',
          { withCredentials: true }
        );

        dispatch(setUserData(response.data));
      } catch (error) {
        console.log(
          'error in getCurrentUser',
          error.response?.data || error.message
        );
        dispatch(setUserData(null));
      }
    };

    getCurrentUser();
  }, [dispatch]);

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        borderRadius: '12px',
                        background: '#333',
                        color: '#fff',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '14px',
                    },
                }}
            />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/interview" element={<InterviewPage />} />
                <Route path="/history" element={<InterViewHistory />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/report/:id" element={<InterviewReport />} />
            </Routes>
        </>
    )
}

export default App