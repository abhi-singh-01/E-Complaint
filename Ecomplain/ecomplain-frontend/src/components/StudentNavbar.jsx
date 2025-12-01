import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton
} from '@mui/material'
import {
  LightMode,
  DarkMode,
  Logout,
  Person
} from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../contexts/ThemeContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

function StudentNavbar() {
  const { isDarkMode, toggleTheme } = useCustomTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <AppBar 
      position="fixed" 
      elevation={0} 
      sx={{ 
        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: isDarkMode ? '1px solid #333' : '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}
        >
          E-Complaint
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Student Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? '#fff' : '#333',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              {user?.name || 'Student'}
            </Typography>
          </Box>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: 'primary.main',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Logout Button */}
          <Button
            variant="contained"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{
              fontWeight: 'bold',
              backgroundColor: '#d32f2f',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#b71c1c',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(211, 47, 47, 0.4)',
                scale: '1.05'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:active': {
                transform: 'translateY(0px)',
                scale: '1.02'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default StudentNavbar
