import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material'
import { Star } from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext.jsx'

function TestimonialsSection() {
  const { isDarkMode } = useCustomTheme()

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      avatar: 'SJ',
      content: 'The E-Complaint system made it so easy to report issues with our lab equipment. The response was quick and the problem was resolved within 2 days!',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'HOD, Mechanical Engineering',
      avatar: 'MC',
      content: 'As an administrator, this system has streamlined our complaint management process. The analytics help us identify trends and improve our services.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Electrical Engineering Student',
      avatar: 'ED',
      content: 'I love how I can track my complaints in real-time. The notifications keep me updated, and the support team is always helpful.',
      rating: 5
    }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        py: 8,
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa'
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
            What Our Users Say
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '350px',
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                    border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#ffd700', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        color: isDarkMode ? '#ccc' : '#666',
                        fontStyle: 'italic',
                        lineHeight: 1.6
                      }}
                    >
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 'bold',
                            color: isDarkMode ? '#fff' : '#333'
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isDarkMode ? '#ccc' : '#666'
                          }}
                        >
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
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

export default TestimonialsSection
