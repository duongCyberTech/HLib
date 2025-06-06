import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Verify from './components/Verify';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            {/* Add more routes as needed */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
