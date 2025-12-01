import { Link as RouterLink } from 'react-router-dom'
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
  DarkMode
} from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../contexts/ThemeContext.jsx'

function Header() {
  const { isDarkMode, toggleTheme } = useCustomTheme()

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
          component={RouterLink}
          to="/"
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1.5rem'
          }}
        >
          E-Complaint
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Button
            color="primary"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            Home
          </Button>
          <Button
            color="primary"
            component={RouterLink}
            to="/about"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            About
          </Button>
          <Button
            color="primary"
            component={RouterLink}
            to="/register"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            Register
          </Button>
          <Button
            color="primary"
            component={RouterLink}
            to="/login"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/admin/login"
            sx={{
              fontWeight: 'bold',
              ml: 1,
              backgroundColor: '#1976d2',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#1565c0',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
                scale: '1.05'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:active': {
                transform: 'translateY(0px)',
                scale: '1.02'
              }
            }}
          >
            Admin
          </Button>
          <IconButton
            onClick={toggleTheme}
            sx={{
              ml: 1,
              color: 'primary.main',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
