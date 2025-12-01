import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext.jsx'

function CTASection() {
  const { isDarkMode } = useCustomTheme()

  return (
    <Box
      sx={{
        width: '100%',
        py: 8,
        background: isDarkMode
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}
    >
      <Box sx={{
        width: '100%',
        px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: '1200px',
          textAlign: 'center'
        }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              lineHeight: 1.2
            }}
          >
            Ready to Get Started?
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 6,
              opacity: 0.9,
              lineHeight: 1.6,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Join thousands of students and administrators who trust our platform
            for efficient complaint management and resolution.
          </Typography>

          <Box sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: '#ff6b6b',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
                '&:hover': {
                  backgroundColor: '#ff5252',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(255, 107, 107, 0.4)'
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Start Free Trial
            </Button>

            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CTASection
