import { Box, Typography, Grid, Card, CardContent, alpha } from '@mui/material'
import {
  Assignment,
  Timeline,
  AdminPanelSettings,
  Notifications,
  Analytics,
  Security
} from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext.jsx'
import { useTheme } from '@mui/material/styles'

function FeaturesSection() {
  const { isDarkMode } = useCustomTheme()
  const theme = useTheme()

  const features = [
    {
      icon: <Assignment sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Easy Complaint Submission',
      description: 'Submit complaints quickly with our intuitive form. Categorize issues and track progress in real-time.'
    },
    {
      icon: <Timeline sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Real-time Tracking',
      description: 'Monitor your complaint status from submission to resolution with detailed progress updates.'
    },
    {
      icon: <AdminPanelSettings sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Admin Dashboard',
      description: 'Comprehensive admin panel for HODs and Assistant HODs to manage and resolve complaints efficiently.'
    },
    {
      icon: <Notifications sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Instant Notifications',
      description: 'Get notified immediately when your complaint status changes or when admins respond.'
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Analytics & Reports',
      description: 'Detailed analytics and reports for administrators to track performance and identify trends.'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and privacy measures.'
    }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        py: 8,
        backgroundColor: isDarkMode ? '#121212' : '#ffffff'
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
          maxWidth: '1200px'
        }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              mb: 6,
              color: isDarkMode ? '#fff' : '#333'
            }}
          >
            Powerful Features for Everyone
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '350px',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default FeaturesSection
