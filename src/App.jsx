import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import toast, { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/registerPage.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="w-full h-screen">
        <Toaster position='top-right' />
        <Routes>
          <Route path="/*" element={<HomePage />} ></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/admin*" element={<AdminPage />} ></Route>
        </Routes>
      </div>
      </GoogleOAuthProvider>
    </BrowserRouter>

  )
}

export default App
