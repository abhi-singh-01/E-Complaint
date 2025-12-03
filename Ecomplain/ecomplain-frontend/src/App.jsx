import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import { AuthProvider, useAuth } from './auth/AuthContext.jsx'
import { ThemeProvider, useTheme as useCustomTheme } from './contexts/ThemeContext.jsx'
import { createAppTheme } from './theme/theme.js'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box, CircularProgress } from '@mui/material'
import Header from './components/Header.jsx'
import StudentNavbar from './components/StudentNavbar.jsx'
import Footer from './components/Footer.jsx'

// Lazy load heavy components
const StudentRegister = lazy(() => import('./pages/student/StudentRegister.jsx'))
const StudentLogin = lazy(() => import('./pages/student/StudentLogin.jsx'))
const StudentForgotPassword = lazy(() => import('./pages/student/StudentForgotPassword.jsx'))
const StudentResetPassword = lazy(() => import('./pages/student/StudentResetPassword.jsx'))
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard.jsx'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const LandingPage = lazy(() => import('./components/LandingPage.jsx'))

function ProtectedRoute({ children, adminRoute = false }) {
  const { token } = useAuth()
  if (!token) {
    // If it's an admin route, redirect to admin login
    if (adminRoute) {
      return <Navigate to="/admin/login" replace />
    }
    // Otherwise redirect to student login
    return <Navigate to="/login" replace />
  }
  return children
}

function ConditionalNavbar() {
  const location = useLocation()
  
  // Show StudentNavbar only on student dashboard route
  if (location.pathname === '/dashboard') {
    return <StudentNavbar />
  }
  
  // Hide navbar on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null
  }
  
  // Show regular Header for all other routes
  return <Header />
}

function ConditionalFooter() {
  const location = useLocation()
  
  // Hide footer on dashboard and admin routes
  if (location.pathname === '/dashboard' || location.pathname.startsWith('/admin')) {
    return null
  }
  
  // Show footer for all other routes
  return <Footer />
}

function App() {
  const { isDarkMode } = useCustomTheme()
  const muiTheme = createAppTheme(isDarkMode ? 'dark' : 'light')

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
          <ConditionalNavbar />

      <Box sx={{ 
        mt: { xs: 7, md: 8 }, 
        flexGrow: 1, 
        marginBottom: 0,
        '& .full-screen-page': {
          marginTop: 0,
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw'
        }
      }}>
        <Routes>
          <Route path="/" element={
            <div className="full-screen-page">
              <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
                <LandingPage />
              </Suspense>
            </div>
          } />
          <Route path="/about" element={
            <div className="full-screen-page">
              <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
                <About />
              </Suspense>
            </div>
          } />
          <Route path="/register" element={
            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
              <StudentRegister />
            </Suspense>
          } />
          <Route path="/login" element={
            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
              <StudentLogin />
            </Suspense>
          } />
          <Route path="/forgot-password" element={
            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
              <StudentForgotPassword />
            </Suspense>
          } />
          <Route path="/forgot" element={
            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
              <StudentForgotPassword />
            </Suspense>
          } />
          <Route path="/reset-password/:token" element={
            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
              <StudentResetPassword />
            </Suspense>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div className="full-screen-page">
                <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
                  <StudentDashboard />
                </Suspense>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/admin/login" element={
            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
              <AdminLogin />
            </Suspense>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute adminRoute={true}>
              <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
        </Routes>
      </Box>
      
      <ConditionalFooter />
      </Box>
      </AuthProvider>
    </MuiThemeProvider>
  )
}

// Main App wrapper with theme provider
function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export default AppWrapper
