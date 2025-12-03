import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  Paper,
  useTheme,
  alpha
} from '@mui/material'
import { 
  School, 
  Security, 
  Speed, 
  Analytics, 
  Support, 
  CheckCircle,
  TrendingUp,
  People,
  Assignment,
  Notifications,
  CloudUpload,
  Dashboard
} from '@mui/icons-material'

function About() {
  const theme = useTheme()

  const features = [
    {
      icon: <Assignment sx={{ fontSize: 40 }} />,
      title: "Easy Submission",
      description: "Submit complaints with document uploads in just a few clicks"
    },
    {
      icon: <Notifications sx={{ fontSize: 40 }} />,
      title: "Real-time Tracking",
      description: "Get instant updates on your complaint status and progress"
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: "Smart Analytics",
      description: "Comprehensive reporting and insights for administrators"
    },
    {
      icon: <CloudUpload sx={{ fontSize: 40 }} />,
      title: "File Attachments",
      description: "Upload supporting documents and evidence easily"
    },
    {
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      title: "Role-based Access",
      description: "Tailored dashboards for students, coordinators, and HODs"
    }
  ]

  const stats = [
    { number: "10K+", label: "Complaints Resolved", icon: <CheckCircle /> },
    { number: "500+", label: "Active Users", icon: <People /> },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp /> },
    { number: "24/7", label: "Support", icon: <Support /> }
  ]

  const values = [
    {
      title: "Transparency",
      description: "Complete visibility into complaint processing and resolution timelines"
    },
    {
      title: "Efficiency",
      description: "Streamlined workflows that save time for both students and staff"
    },
    {
      title: "Accessibility",
      description: "Mobile-responsive design ensuring access from any device, anywhere"
    },
    {
      title: "Innovation",
      description: "Cutting-edge technology to modernize educational complaint management"
    }
  ]

  return (
    <Box sx={{ 
      width: '100vw', 
      minHeight: '100vh', 
      margin: 0,
      padding: 0,
      background: '#ffffff'
    }}>
      <Box sx={{ 
        width: '100%', 
        py: 8,
        px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }
      }}>
        {/* Mission Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            mb: 8, 
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar sx={{ 
              bgcolor: theme.palette.primary.main, 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 3 
            }}>
              <School sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              Our Mission
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'justify', 
              lineHeight: 1.8, 
              color: theme.palette.text.secondary,
              maxWidth: '900px',
              mx: 'auto'
            }}
          >
            We are committed to transforming how educational institutions handle complaints and feedback. 
            Our platform bridges the gap between students and administration, ensuring every voice is heard, 
            every concern is addressed, and every resolution is transparent. We believe in creating an 
            environment where communication flows seamlessly, leading to better educational experiences for all.
          </Typography>
        </Paper>

        {/* Statistics Section */}
        <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
            Impact in Numbers
          </Typography>
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

        {/* Features Section */}
        <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
            Powerful Features
          </Typography>
          <Box sx={{ 
            width: '100%', 
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
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

        {/* Values Section */}
        <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
            Our Core Values
          </Typography>
          <Box sx={{ 
            width: '100%', 
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
              {values.map((value, index) => (
                <Grid item xs={12} md={6} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 4, 
                      height: '100%',
                      width: '100%',
                      maxWidth: '500px',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                      border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 16px ${alpha(theme.palette.secondary.main, 0.1)}`
                      }
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: theme.palette.secondary.main }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Contact Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 3
          }}
        >
          <Avatar sx={{ 
            bgcolor: theme.palette.primary.main, 
            width: 80, 
            height: 80, 
            mx: 'auto', 
            mb: 3 
          }}>
            <Support sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            Get in Touch
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.secondary }}>
            Ready to transform your institution's complaint management?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary }}>
            For technical support, general inquiries, or to schedule a demo, our team is here to help.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              label="support@ecomplaint.edu" 
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontSize: '1rem',
                py: 2,
                px: 3
              }} 
            />
            <Chip 
              label="+1 (555) 123-4567" 
              sx={{ 
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                fontSize: '1rem',
                py: 2,
                px: 3
              }} 
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default About