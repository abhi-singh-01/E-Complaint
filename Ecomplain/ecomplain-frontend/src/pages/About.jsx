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
  alpha,
  Fade,
  Zoom,
  Grow
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
  Dashboard,
  Email,
  Phone,
  LocationOn,
  Verified
} from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../contexts/ThemeContext.jsx'

function About() {
  const theme = useTheme()
  const { isDarkMode } = useCustomTheme()

  const features = [
    {
      icon: <Assignment sx={{ fontSize: 50 }} />,
      title: "Easy Submission",
      description: "Submit complaints with document uploads in just a few clicks",
      color: "#1976d2"
    },
    {
      icon: <Notifications sx={{ fontSize: 50 }} />,
      title: "Real-time Tracking",
      description: "Get instant updates on your complaint status and progress",
      color: "#2e7d32"
    },
    {
      icon: <Security sx={{ fontSize: 50 }} />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security",
      color: "#d32f2f"
    },
    {
      icon: <Analytics sx={{ fontSize: 50 }} />,
      title: "Smart Analytics",
      description: "Comprehensive reporting and insights for administrators",
      color: "#ed6c02"
    },
    {
      icon: <CloudUpload sx={{ fontSize: 50 }} />,
      title: "File Attachments",
      description: "Upload supporting documents and evidence easily",
      color: "#9c27b0"
    },
    {
      icon: <Dashboard sx={{ fontSize: 50 }} />,
      title: "Role-based Access",
      description: "Tailored dashboards for students, coordinators, and HODs",
      color: "#0288d1"
    }
  ]

  const stats = [
    { number: "10K+", label: "Complaints Resolved", icon: <CheckCircle />, color: "#2e7d32" },
    { number: "500+", label: "Active Users", icon: <People />, color: "#1976d2" },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp />, color: "#ed6c02" },
    { number: "24/7", label: "Support", icon: <Support />, color: "#9c27b0" }
  ]

  const values = [
    {
      title: "Transparency",
      description: "Complete visibility into complaint processing and resolution timelines",
      icon: <Verified sx={{ fontSize: 40 }} />,
      color: "#1976d2"
    },
    {
      title: "Efficiency",
      description: "Streamlined workflows that save time for both students and staff",
      icon: <Speed sx={{ fontSize: 40 }} />,
      color: "#2e7d32"
    },
    {
      title: "Accessibility",
      description: "Mobile-responsive design ensuring access from any device, anywhere",
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      color: "#ed6c02"
    },
    {
      title: "Innovation",
      description: "Cutting-edge technology to modernize educational complaint management",
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: "#9c27b0"
    }
  ]

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      background: isDarkMode
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDarkMode
          ? 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.05) 0%, transparent 50%)',
        zIndex: 0
      }
    }}>
      <Box sx={{
        width: '100%',
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              mb: { xs: 6, md: 8 },
              borderRadius: { xs: 2, md: 4 },
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
              border: isDarkMode
                ? `1px solid ${alpha('#1976d2', 0.3)}`
                : `1px solid ${alpha('#1976d2', 0.2)}`,
              boxShadow: isDarkMode
                ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(25, 118, 210, 0.1)'
                : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(25, 118, 210, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Zoom in timeout={800}>
                <Avatar sx={{
                  background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                  width: { xs: 80, sm: 100 },
                  height: { xs: 80, sm: 100 },
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 8px 32px rgba(25, 118, 210, 0.5), 0 4px 16px rgba(156, 39, 176, 0.3)',
                  border: '3px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <School sx={{ fontSize: { xs: 40, sm: 50 }, color: '#fff' }} />
                </Avatar>
              </Zoom>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: isDarkMode ? '#ffffff' : '#1976d2',
                  mb: 2,
                  fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                Our Mission
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'justify',
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                maxWidth: '900px',
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              We are committed to transforming how educational institutions handle complaints and feedback.
              Our platform bridges the gap between students and administration, ensuring every voice is heard,
              every concern is addressed, and every resolution is transparent. We believe in creating an
              environment where communication flows seamlessly, leading to better educational experiences for all.
            </Typography>
          </Paper>
        </Fade>

        {/* Statistics Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Fade in timeout={1200}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              Impact in Numbers
            </Typography>
          </Fade>
          <Grid container spacing={{ xs: 3, md: 4 }} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
                <Grow in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: { xs: 2, sm: 3 },
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      aspectRatio: '1 / 1',
                      minHeight: { xs: 180, sm: 220, md: 240 },
                      background: isDarkMode
                        ? `linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)`
                        : `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)`,
                      border: `1px solid ${alpha(stat.color, isDarkMode ? 0.3 : 0.2)}`,
                      borderRadius: { xs: 2, md: 3 },
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: `0 16px 40px ${alpha(stat.color, 0.4)}`,
                        border: `2px solid ${alpha(stat.color, 0.6)}`
                      }
                    }}
                  >
                    <CardContent sx={{ p: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                      <Avatar sx={{
                        bgcolor: `${alpha(stat.color, 0.2)}`,
                        width: { xs: 50, sm: 60, md: 70 },
                        height: { xs: 50, sm: 60, md: 70 },
                        mb: { xs: 1, sm: 2 },
                        color: stat.color,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'rotate(360deg) scale(1.1)',
                          bgcolor: `${alpha(stat.color, 0.3)}`
                        }
                      }}>
                        {stat.icon}
                      </Avatar>
                      <Typography
                        variant="h3"
                        component="div"
                        sx={{
                          fontWeight: 700,
                          color: stat.color,
                          mb: 0.5,
                          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                          fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Fade in timeout={1400}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              Powerful Features
            </Typography>
          </Fade>
          <Grid container spacing={{ xs: 3, md: 4 }} sx={{ justifyContent: 'center' }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow in timeout={1200 + index * 150}>
                  <Card
                    sx={{
                      height: '100%',
                      p: { xs: 2, sm: 3 },
                      textAlign: 'center',
                      background: isDarkMode
                        ? `linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)`
                        : `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)`,
                      border: `1px solid ${alpha(feature.color, isDarkMode ? 0.3 : 0.2)}`,
                      borderRadius: { xs: 2, md: 3 },
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.03)',
                        boxShadow: `0 12px 32px ${alpha(feature.color, 0.3)}`,
                        border: `2px solid ${alpha(feature.color, 0.5)}`,
                        background: isDarkMode
                          ? `linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, ${alpha(feature.color, 0.1)} 100%)`
                          : `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${alpha(feature.color, 0.05)} 100%)`
                      }
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          color: feature.color,
                          mb: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.2) rotate(5deg)'
                          }
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          mb: 1
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Values Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Fade in timeout={1600}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              Our Core Values
            </Typography>
          </Fade>
          <Grid container spacing={{ xs: 3, md: 4 }} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index} sx={{ display: 'flex' }}>
                <Grow in timeout={1400 + index * 200}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, sm: 4 },
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: { xs: 180, sm: 200 },
                      background: isDarkMode
                        ? `linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)`
                        : `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)`,
                      border: `1px solid ${alpha(value.color, isDarkMode ? 0.3 : 0.2)}`,
                      borderRadius: { xs: 2, md: 3 },
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 32px ${alpha(value.color, 0.3)}`,
                        border: `2px solid ${alpha(value.color, 0.5)}`
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{
                        bgcolor: `${alpha(value.color, 0.2)}`,
                        width: { xs: 50, sm: 60 },
                        height: { xs: 50, sm: 60 },
                        mr: 2,
                        color: value.color,
                        flexShrink: 0
                      }}>
                        {value.icon}
                      </Avatar>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          color: value.color,
                          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                        }}
                      >
                        {value.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        flexGrow: 1
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Fade in timeout={1800}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              textAlign: 'center',
              background: isDarkMode
                ? `linear-gradient(135deg, ${alpha('#1976d2', 0.15)} 0%, ${alpha('#9c27b0', 0.15)} 100%)`
                : `linear-gradient(135deg, ${alpha('#1976d2', 0.1)} 0%, ${alpha('#9c27b0', 0.1)} 100%)`,
              border: `2px solid ${alpha('#1976d2', isDarkMode ? 0.3 : 0.2)}`,
              borderRadius: { xs: 2, md: 4 },
              boxShadow: isDarkMode
                ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Zoom in timeout={2000}>
              <Avatar sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                mx: 'auto',
                mb: 3,
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.5), 0 4px 16px rgba(156, 39, 176, 0.3)',
                border: '3px solid rgba(255, 255, 255, 0.3)'
              }}>
                <Support sx={{ fontSize: { xs: 40, sm: 50 }, color: '#fff' }} />
              </Avatar>
            </Zoom>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: '#1976d2',
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: theme.palette.text.secondary,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              Ready to transform your institution's complaint management?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              For technical support, general inquiries, or to schedule a demo, our team is here to help.
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap'
            }}>
              <Chip
                icon={<Email />}
                label="support@ecomplaint.edu"
                sx={{
                  bgcolor: isDarkMode
                    ? alpha('#1976d2', 0.2)
                    : alpha('#1976d2', 0.1),
                  color: '#1976d2',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  py: { xs: 2, sm: 2.5 },
                  px: { xs: 2, sm: 3 },
                  fontWeight: 600,
                  border: `1px solid ${alpha('#1976d2', 0.3)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha('#1976d2', 0.3),
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <Chip
                icon={<Phone />}
                label="+1 (555) 123-4567"
                sx={{
                  bgcolor: isDarkMode
                    ? alpha('#9c27b0', 0.2)
                    : alpha('#9c27b0', 0.1),
                  color: '#9c27b0',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  py: { xs: 2, sm: 2.5 },
                  px: { xs: 2, sm: 3 },
                  fontWeight: 600,
                  border: `1px solid ${alpha('#9c27b0', 0.3)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha('#9c27b0', 0.3),
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <Chip
                icon={<LocationOn />}
                label="123 University Ave, Campus"
                sx={{
                  bgcolor: isDarkMode
                    ? alpha('#2e7d32', 0.2)
                    : alpha('#2e7d32', 0.1),
                  color: '#2e7d32',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  py: { xs: 2, sm: 2.5 },
                  px: { xs: 2, sm: 3 },
                  fontWeight: 600,
                  border: `1px solid ${alpha('#2e7d32', 0.3)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha('#2e7d32', 0.3),
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  )
}

export default About
