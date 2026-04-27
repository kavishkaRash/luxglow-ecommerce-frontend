import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import toast, { Toaster } from 'react-hot-toast';
import TestPage from './pages/test.jsx';

function App() {

  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        <Toaster position='top-right' />
        <Routes>
          <Route path="/*" element={<HomePage />} ></Route>
          <Route path="/register" element={<h1>Register Page</h1>} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/admin*" element={<AdminPage />} ></Route>
          <Route path="/test" element={<TestPage />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
