import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import { AuthLayout, MainLayout } from './layouts';
import { Login, Signup, Verify, ForgotPassword } from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes with AuthLayout */}
          <Route path="/" element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          } />
          <Route path="/login" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />
          <Route path="/verify" element={
            <AuthLayout>
              <Verify />
            </AuthLayout>
          } />
          <Route path="/forgot-password" element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          } />

          {/* Protected routes with MainLayout */}
          <Route path="/dashboard" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/profile" element={
            <MainLayout>
              <Profile />
            </MainLayout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
