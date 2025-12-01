import { Box, Typography, Grid, Card, CardContent, Avatar, alpha } from '@mui/material'
import { People, CheckCircle, Support, Star } from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext.jsx'
import { useTheme } from '@mui/material/styles'

function StatsSection() {
  const { isDarkMode } = useCustomTheme()
  const theme = useTheme()

  const stats = [
    { number: '1000+', label: 'Active Users', icon: <People /> },
    { number: '500+', label: 'Complaints Resolved', icon: <CheckCircle /> },
    { number: '24/7', label: 'Support Available', icon: <Support /> },
    { number: '95%', label: 'Satisfaction Rate', icon: <Star /> }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        py: 8,
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
        borderTop: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0'
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
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    width: '100%',
                    maxWidth: '280px',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${alpha(theme.palette.secondary.main, 0.2)}`
                    }
                  }}
                >
                  <CardContent>
                    <Avatar sx={{
                      bgcolor: theme.palette.secondary.main,
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2
                    }}>
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: theme.palette.secondary.main, mb: 1 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
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

export default StatsSection
