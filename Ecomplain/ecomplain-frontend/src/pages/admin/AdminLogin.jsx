import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import api from '../../lib/api.js'
import { useAuth } from '../../auth/AuthContext.jsx'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext.jsx'
import AdminLoginNavbar from '../../components/AdminLoginNavbar.jsx'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon,
  AdminPanelSettings,
  SupervisorAccount
} from '@mui/icons-material'

export default function AdminLogin() {
  const nav = useNavigate()
  const { setToken, setUser } = useAuth()
  const { isDarkMode } = useCustomTheme()
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'additional_hod', // Default to additional_hod
    department: '' // Department selection
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[a-zA-Z0-9._%+-]+@university\.edu$/i.test(form.email)) {
      newErrors.email = 'Please use your university email address (@university.edu)'
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Role validation
    if (!form.role) {
      newErrors.role = 'Please select your role'
    }

    // Department validation (required for all roles except super_admin and external departments)
    const externalRoles = ['accounts', 'librarian', 'maintenance'];
    if (form.role && form.role !== 'super_admin' && !externalRoles.includes(form.role) && !form.department) {
      newErrors.department = 'Please select your department'
    }
    
    // Auto-set department for external roles
    if (form.role === 'accounts') {
      form.department = 'accounts';
    } else if (form.role === 'librarian') {
      form.department = 'librarian';
    } else if (form.role === 'maintenance') {
      form.department = 'maintenance';
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field) => (e) => {
    const value = e.target.value
    setForm({ ...form, [field]: value })
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
    
    // If role changes to super_admin or external department, handle department
    if (field === 'role') {
      if (value === 'super_admin') {
        setForm(prev => ({ ...prev, department: '' }))
      } else if (value === 'accounts') {
        setForm(prev => ({ ...prev, department: 'accounts' }))
      } else if (value === 'librarian') {
        setForm(prev => ({ ...prev, department: 'librarian' }))
      } else if (value === 'maintenance') {
        setForm(prev => ({ ...prev, department: 'maintenance' }))
      }
      if (errors.department) {
        setErrors({ ...errors, department: '' })
      }
    }
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Debug: Log form data before validation
    console.log('Form data before validation:', form)
    
    if (!validateForm()) {
      console.log('Validation failed. Errors:', errors)
      setError('Please fix the errors below')
      return
    }
    
    console.log('Validation passed. Proceeding with login...')

    setLoading(true)
    try {
      // For external departments, send role as 'external' and department as lowercase
      const isExternalRole = ['accounts', 'librarian', 'maintenance'].includes(form.role)
      const loginData = {
        email: form.email,
        password: form.password,
        role: isExternalRole ? 'external' : form.role,
        department: isExternalRole ? form.role.toLowerCase() : form.department
      }

      const { data } = await api.post('/api/auth/admin/login', loginData)
      
      setToken(data.token)
      setUser(data.admin)
      setSuccess('Login successful! Redirecting...')
      
      setTimeout(() => {
        nav('/admin/dashboard')
      }, 1500)
    } catch (err) {
      console.error('Login error:', err)
      console.error('Error response:', err.response?.data)
      
      if (err.response?.data?.errors) {
        // Handle validation errors
        const validationErrors = err.response.data.errors
        const errorMessages = validationErrors.map(error => `${error.field}: ${error.message}`).join(', ')
        setError(`Validation failed: ${errorMessages}`)
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError('Login failed. Please check your credentials and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AdminLoginNavbar />
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)'
            : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          py: 4,
          pt: 12 // Add top padding to account for fixed navbar
        }}
      >
        <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: isDarkMode ? '#ffffff' : 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Admin
          </Typography>
        </Box>

        <Card 
          elevation={10}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: isDarkMode 
              ? '0 20px 40px rgba(0,0,0,0.3)'
              : '0 20px 40px rgba(0,0,0,0.1)',
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            border: isDarkMode ? '1px solid #333' : 'none'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 2 
              }}>
                <AdminPanelSettings sx={{ 
                  fontSize: 48, 
                  color: isDarkMode ? '#1976d2' : '#2c3e50' 
                }} />
              </Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ 
                fontWeight: 'bold', 
                color: isDarkMode ? '#ffffff' : '#2c3e50' 
              }}>
                Administrative Access
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to manage complaints and oversee department operations
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={submit} noValidate>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Your Role</InputLabel>
                <Select
                  value={form.role}
                  label="Select Your Role"
                  onChange={handleInputChange('role')}
                  error={!!errors.role}
                >
                  <MenuItem value="coordinator">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SupervisorAccount color="primary" />
                      <Box>
                        <Typography variant="body1">Coordinator</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Intake level - Verify, resolve or forward complaints
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="additional_hod">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SupervisorAccount color="primary" />
                      <Box>
                        <Typography variant="body1">Additional HOD</Typography>
                        <Typography variant="caption" color="text.secondary">
                          First level - Review and resolve complaints
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="dean">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AdminPanelSettings color="primary" />
                      <Box>
                        <Typography variant="body1">Dean</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Final authority - Escalated complaints and reports
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="super_admin">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AdminPanelSettings color="error" />
                      <Box>
                        <Typography variant="body1">Super Administrator</Typography>
                        <Typography variant="caption" color="text.secondary">
                          System-wide access and management
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="accounts">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AdminPanelSettings color="info" />
                      <Box>
                        <Typography variant="body1">Accounts Department</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Handle fee-related complaints
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="librarian">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AdminPanelSettings color="info" />
                      <Box>
                        <Typography variant="body1">Librarian</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Handle library-related complaints
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="maintenance">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AdminPanelSettings color="info" />
                      <Box>
                        <Typography variant="body1">Maintenance Department</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Handle infrastructure complaints
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                </Select>
                {errors.role && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                    {errors.role}
                  </Typography>
                )}
              </FormControl>

              {/* Department Selection - Only show for non-super admin and non-external department roles */}
              {form.role !== 'super_admin' && form.role !== 'accounts' && form.role !== 'librarian' && form.role !== 'maintenance' && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Select Department</InputLabel>
                  <Select
                    value={form.department}
                    label="Select Department"
                    onChange={handleInputChange('department')}
                    error={!!errors.department}
                  >
                    <MenuItem value="MCA">MCA</MenuItem>
                    <MenuItem value="MBA">MBA</MenuItem>
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Mechanical">Mechanical</MenuItem>
                    <MenuItem value="Civil">Civil</MenuItem>
                    <MenuItem value="Electrical">Electrical</MenuItem>
                    <MenuItem value="General">General</MenuItem>
                  </Select>
                  {errors.department && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.department}
                    </Typography>
                  )}
                </FormControl>
              )}
              {/* Auto-set department for external departments */}
              {form.role === 'accounts' && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value="accounts"
                    label="Department"
                    disabled
                  >
                    <MenuItem value="accounts">Accounts</MenuItem>
                  </Select>
                </FormControl>
              )}
              {form.role === 'librarian' && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value="librarian"
                    label="Department"
                    disabled
                  >
                    <MenuItem value="librarian">Librarian</MenuItem>
                  </Select>
                </FormControl>
              )}
              {form.role === 'maintenance' && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value="maintenance"
                    label="Department"
                    disabled
                  >
                    <MenuItem value="maintenance">Maintenance</MenuItem>
                  </Select>
                </FormControl>
              )}

              <TextField
                fullWidth
                label="Admin Email"
                type="email"
                value={form.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                helperText={errors.email || "Enter your administrative email address"}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleInputChange('password')}
                error={!!errors.password}
                helperText={errors.password}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: isDarkMode 
                    ? 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)'
                    : 'linear-gradient(45deg, #2c3e50 30%, #34495e 90%)',
                  '&:hover': {
                    background: isDarkMode 
                      ? 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)'
                      : 'linear-gradient(45deg, #1a252f 30%, #2c3e50 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: isDarkMode 
                      ? '0 8px 25px rgba(25, 118, 210, 0.3)'
                      : '0 8px 25px rgba(44, 62, 80, 0.3)'
                  },
                  transition: 'all 0.3s ease',
                  mb: 3
                }}
                startIcon={<LoginIcon />}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>


              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Need access? Contact system administrator
                </Typography>
                
              {/* Default Credentials Info */}
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'rgba(25, 118, 210, 0.05)', 
                borderRadius: 2,
                border: '1px solid rgba(25, 118, 210, 0.1)'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>
                  Default Credentials (Change after first login):
                </Typography>
                {/* Only show credentials for department roles, not external departments */}
                {form.role !== 'accounts' && form.role !== 'librarian' && form.role !== 'maintenance' && form.role !== 'super_admin' && form.department && (
                  <>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Coordinator: {form.department ? `${form.department.toLowerCase()}.coordinator@university.edu` : 'dept.coordinator@university.edu'} / {form.department ? `${form.department.toLowerCase()}123456` : 'dept123456'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Additional HOD: {form.department ? `${form.department.toLowerCase()}.additional@university.edu` : 'dept.additional@university.edu'} / {form.department ? `${form.department.toLowerCase()}123456` : 'dept123456'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Dean: {form.department ? `${form.department.toLowerCase()}.dean@university.edu` : 'dept.dean@university.edu'} / {form.department ? `${form.department.toLowerCase()}123456` : 'dept123456'}
                    </Typography>
                  </>
                )}
                {/* Show message for external departments */}
                {(form.role === 'accounts' || form.role === 'librarian' || form.role === 'maintenance') && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic' }}>
                    External departments have a single login account. Contact Super Admin to create your account.
                  </Typography>
                )}
                {/* Show message for super admin */}
                {form.role === 'super_admin' && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Super Admin: superadmin@university.edu / superadmin123456
                  </Typography>
                )}
              </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ 
            color: isDarkMode ? '#ffffff' : 'white', 
            opacity: 0.8 
          }}>
            Administrative access is by invitation only. Contact{' '}
            <Link 
              href="mailto:admin@ecomplaint.edu" 
              sx={{ 
                color: isDarkMode ? '#ffffff' : 'white', 
                textDecoration: 'underline',
                '&:hover': { opacity: 0.7 }
              }}
            >
              admin@ecomplaint.edu
            </Link>
            {' '}for access requests.
          </Typography>
        </Box>
        </Container>
      </Box>
    </>
  )
}
