import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import api from '../../lib/api.js'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext.jsx'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  Card,
  CardContent,
  Link
} from '@mui/material'
import {
  Email,
  ArrowBack,
  LockReset
} from '@mui/icons-material'

export default function StudentForgotPassword() {
  const nav = useNavigate()
  const { isDarkMode } = useCustomTheme()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // College email validation
  const validateCollegeEmail = (email) => {
    const collegeEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/i
    return collegeEmailPattern.test(email)
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'College email is required'
    } else if (!validateCollegeEmail(email)) {
      newErrors.email = 'Please use your educational email address (must end with .edu)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field) => (e) => {
    setEmail(e.target.value)
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) {
      setError('Please fix the errors below')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post('/api/auth/forgot-password', {
        email: email.trim(),
        userType: 'student'
      })
      
      setSuccess('Password reset link has been sent to your email. Please check your inbox.')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.')
      console.error('Forgot password error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Card 
          sx={{ 
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backgroundColor: isDarkMode 
              ? 'rgba(30, 30, 30, 0.9)' 
              : 'white'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                mb: 3
              }}>
                <LockReset sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Forgot Password
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {success ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    fontSize: '1rem',
                    '& .MuiAlert-message': {
                      fontSize: '1rem'
                    }
                  }}
                >
                  Password reset link has been sent to your email. Please check your inbox.
                </Alert>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Link 
                    component={RouterLink} 
                    to="/login" 
                    sx={{ 
                      color: '#1976d2',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    <ArrowBack sx={{ fontSize: 18 }} />
                    Back to Login
                  </Link>
                </Box>
              </Box>
            ) : (
              <>
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={submit} noValidate>
                  <TextField
                    fullWidth
                    label="College Email"
                    type="email"
                    value={email}
                    onChange={handleInputChange('email')}
                    error={!!errors.email}
                    helperText={errors.email || "Enter your educational email address"}
                    required
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: isDarkMode ? 'rgba(66, 66, 66, 0.8)' : 'rgba(255, 255, 255, 0.9)'
                      }
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="primary" />
                          </InputAdornment>
                        ),
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      mb: 3,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5568d3 0%, #6a3d91 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Link 
                      component={RouterLink} 
                      to="/login" 
                      sx={{ 
                        color: '#1976d2',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      <ArrowBack sx={{ fontSize: 18 }} />
                      Back to Login
                    </Link>
                  </Box>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

