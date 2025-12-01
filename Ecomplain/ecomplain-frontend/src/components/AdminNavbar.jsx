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
  AdminPanelSettings,
  SupervisorAccount
} from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../contexts/ThemeContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

function AdminNavbar() {
  const { isDarkMode, toggleTheme } = useCustomTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('Admin logout clicked, navigating to about page for testing')
    logout()
    navigate('/about')
  }

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'hod':
        return <AdminPanelSettings sx={{ color: '#1976d2', fontSize: '1.8rem' }} />
      case 'assistant_hod':
        return <SupervisorAccount sx={{ color: '#1976d2', fontSize: '1.8rem' }} />
      default:
        return <AdminPanelSettings sx={{ color: '#1976d2', fontSize: '1.8rem' }} />
    }
  }

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'hod':
        return 'HOD'
      case 'assistant_hod':
        return 'Assistant HOD'
      case 'external':
        // For external departments, use department field to determine title
        if (user?.department === 'accounts') return 'Accounts Department'
        if (user?.department === 'librarian') return 'Librarian Department'
        if (user?.department === 'maintenance') return 'Maintenance Department'
        return 'External Department'
      default:
        return 'Admin'
    }
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
          E-Complaint Admin
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Admin Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getRoleIcon()}
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? '#fff' : '#333',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              {getRoleTitle()}
            </Typography>
          </Box>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: 'primary.main',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
              '& .MuiSvgIcon-root': {
                fontSize: '1.8rem'
              }
            }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Logout Button */}
          <Button
            variant="contained"
            onClick={handleLogout}
            startIcon={<Logout sx={{ fontSize: '1.4rem' }} />}
            sx={{
              fontWeight: 'bold',
              backgroundColor: '#d32f2f',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontSize: '1rem',
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

export default AdminNavbar
