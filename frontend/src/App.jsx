import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import { AuthLayout, MainLayout } from './layouts';
import {
  Login,
  Signup,
  Verify,
  ForgotPassword,
  Dashboard,
  Profile, 
  Document,
  FavDocument,
  Courses
} from './pages'
import { ProtectedRoute } from './components/common';
import MaterialUIIconsTest from './components/common/FontAwesomeTest';
import CoursesDemo from './pages/courses/CoursesDemo';
import CourseDetail from './pages/course-detail/course-detail';

function App() {
  return (
    <div style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth routes with AuthLayout */}
            <Route
              path="/"
              element={
                <AuthLayout>
                  <Signup />
                </AuthLayout>
              }
            />
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/verify"
              element={
                <AuthLayout>
                  <Verify />
                </AuthLayout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AuthLayout>
                  <ForgotPassword />
                </AuthLayout>
              }
            />

            {/* Protected routes with MainLayout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Additional protected routes for sidebar menu items */}
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Courses />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/course/:course_id'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CourseDetail/>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/threads"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div>Threads Page - Coming Soon</div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/collections"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div>Collections Page - Coming Soon</div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div>
                      <Document />
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div>
                      <FavDocument />
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/revenue"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div>Revenue Report Page - Coming Soon</div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Material-UI Icons Test Route */}
            <Route
              path="/test-icons"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MaterialUIIconsTest />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Courses Demo Route */}
            <Route
              path="/courses-demo"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CoursesDemo />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
