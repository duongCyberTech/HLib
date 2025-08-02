import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Verify from './components/Verify';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Test from './pages/Test'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* Auth */}
            <Route path="/" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Add more routes as needed */}
            {/* Test */}
            <Route path='/test' element={<Test />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
