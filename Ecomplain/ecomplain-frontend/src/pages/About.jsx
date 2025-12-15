import {
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
  IconButton
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
  Verified,
  GitHub,
  LinkedIn,
  Code
} from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../contexts/ThemeContext.jsx'
import { keyframes } from '@mui/system'

// CSS Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

function About() {
  const theme = useTheme()
  const { isDarkMode } = useCustomTheme()

  const features = [
    { icon: <Assignment />, title: "Easy Submission", description: "Quick complaint filing with documents", color: "#1976d2" },
    { icon: <Notifications />, title: "Real-time Tracking", description: "Instant status updates", color: "#2e7d32" },
    { icon: <Security />, title: "Secure & Private", description: "Enterprise-grade security", color: "#d32f2f" },
    { icon: <Analytics />, title: "Smart Analytics", description: "Comprehensive insights", color: "#ed6c02" },
    { icon: <CloudUpload />, title: "File Attachments", description: "Upload evidence easily", color: "#9c27b0" },
    { icon: <Dashboard />, title: "Role-based Access", description: "Tailored dashboards", color: "#0288d1" }
  ]

  const stats = [
    { number: "10K+", label: "Resolved", icon: <CheckCircle />, color: "#2e7d32" },
    { number: "500+", label: "Users", icon: <People />, color: "#1976d2" },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp />, color: "#ed6c02" },
    { number: "24/7", label: "Support", icon: <Support />, color: "#9c27b0" }
  ]

  const developers = [
    {
      name: "Abhijeet Singh",
      role: "Full Stack Developer",
      avatar: "AS",
      color: "#1976d2",
      skills: ["React", "Node.js", "MongoDB"],
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Abhishek Mishra",
      role: "Full Stack Developer",
      avatar: "AM",
      color: "#9c27b0",
      skills: ["React", "Express", "AWS"],
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  ]

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: 3,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`
    }
  }

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      background: isDarkMode
        ? 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Shapes */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: alpha('#1976d2', 0.1),
        filter: 'blur(60px)',
        animation: `${float} 6s ease-in-out infinite`
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: alpha('#9c27b0', 0.1),
        filter: 'blur(80px)',
        animation: `${float} 8s ease-in-out infinite reverse`
      }} />

      <Box sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>

        {/* Hero Section */}
        <Box sx={{
          textAlign: 'center',
          mb: 8,
          animation: `${fadeInUp} 1s ease-out`
        }}>
          <Avatar sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 3,
            background: 'linear-gradient(135deg, #1976d2, #9c27b0)',
            boxShadow: '0 10px 40px rgba(25, 118, 210, 0.5)',
            animation: `${pulse} 2s ease-in-out infinite`
          }}>
            <School sx={{ fontSize: 50, color: '#fff' }} />
          </Avatar>
          <Typography variant="h2" sx={{
            fontWeight: 800,
            color: '#fff',
            mb: 2,
            fontSize: { xs: '2rem', md: '3.5rem' },
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            E-Complaint Portal
          </Typography>
          <Typography variant="h5" sx={{
            color: alpha('#fff', 0.9),
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}>
            Transforming how institutions handle complaints with modern technology
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 8, justifyContent: 'center' }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card sx={{
                ...cardStyle,
                textAlign: 'center',
                p: 3,
                animation: `${fadeInUp} 0.8s ease-out ${index * 0.1}s both`
              }}>
                <Avatar sx={{
                  bgcolor: alpha(stat.color, 0.2),
                  color: stat.color,
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  mb: 2,
                  animation: `${float} 3s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}>
                  {stat.icon}
                </Avatar>
                <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color, mb: 0.5 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#fff',
            mb: 4,
            animation: `${fadeInUp} 0.8s ease-out`
          }}>
            ✨ Powerful Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={6} md={4} key={index}>
                <Card sx={{
                  ...cardStyle,
                  height: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  p: 2,
                  animation: `${index % 2 === 0 ? fadeInLeft : fadeInRight} 0.8s ease-out ${index * 0.1}s both`,
                  '&:hover': {
                    ...cardStyle['&:hover'],
                    borderColor: feature.color,
                    '& .feature-icon': {
                      transform: 'scale(1.2) rotate(10deg)'
                    }
                  }
                }}>
                  <Box className="feature-icon" sx={{
                    color: feature.color,
                    mb: 2,
                    transition: 'transform 0.3s ease',
                    '& svg': { fontSize: 40 }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Developers Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#fff',
            mb: 2,
            animation: `${fadeInUp} 0.8s ease-out`
          }}>
            👨‍💻 Meet The Developers
          </Typography>
          <Typography variant="body1" sx={{
            textAlign: 'center',
            color: alpha('#fff', 0.8),
            mb: 4,
            maxWidth: 500,
            mx: 'auto'
          }}>
            The talented team behind this project
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {developers.map((dev, index) => (
              <Grid item xs={12} sm={6} md={5} key={index}>
                <Card sx={{
                  ...cardStyle,
                  p: 4,
                  textAlign: 'center',
                  animation: `${index === 0 ? fadeInLeft : fadeInRight} 1s ease-out`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${dev.color}, ${alpha(dev.color, 0.5)})`,
                    backgroundSize: '200% 100%',
                    animation: `${shimmer} 2s linear infinite`
                  }
                }}>
                  <Avatar sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: dev.color,
                    fontSize: '2rem',
                    fontWeight: 700,
                    boxShadow: `0 10px 30px ${alpha(dev.color, 0.4)}`,
                    animation: `${float} 4s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`
                  }}>
                    {dev.avatar}
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {dev.name}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: dev.color,
                    fontWeight: 500,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}>
                    <Code sx={{ fontSize: 18 }} />
                    {dev.role}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {dev.skills.map((skill, i) => (
                      <Chip
                        key={i}
                        label={skill}
                        size="small"
                        sx={{
                          m: 0.5,
                          bgcolor: alpha(dev.color, 0.1),
                          color: dev.color,
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton
                      href={dev.github}
                      target="_blank"
                      sx={{
                        bgcolor: alpha(dev.color, 0.1),
                        color: dev.color,
                        '&:hover': { bgcolor: alpha(dev.color, 0.2), transform: 'scale(1.1)' }
                      }}
                    >
                      <GitHub />
                    </IconButton>
                    <IconButton
                      href={dev.linkedin}
                      target="_blank"
                      sx={{
                        bgcolor: alpha(dev.color, 0.1),
                        color: dev.color,
                        '&:hover': { bgcolor: alpha(dev.color, 0.2), transform: 'scale(1.1)' }
                      }}
                    >
                      <LinkedIn />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Card sx={{
          ...cardStyle,
          p: { xs: 3, md: 5 },
          textAlign: 'center',
          animation: `${fadeInUp} 1s ease-out`
        }}>
          <Avatar sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            background: 'linear-gradient(135deg, #1976d2, #9c27b0)',
            animation: `${pulse} 2s ease-in-out infinite`
          }}>
            <Support sx={{ fontSize: 40, color: '#fff' }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 1 }}>
            Get in Touch
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
            Have questions? We're here to help!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            {[
              { icon: <Email />, label: "support@ecomplaint.edu", color: "#1976d2" },
              { icon: <Phone />, label: "+91 1234567890", color: "#9c27b0" },
              { icon: <LocationOn />, label: "University Campus", color: "#2e7d32" }
            ].map((item, i) => (
              <Chip
                key={i}
                icon={item.icon}
                label={item.label}
                sx={{
                  py: 2.5,
                  px: 1,
                  bgcolor: alpha(item.color, 0.1),
                  color: item.color,
                  fontWeight: 500,
                  '&:hover': { bgcolor: alpha(item.color, 0.2) }
                }}
              />
            ))}
          </Box>
        </Card>

      </Box>
    </Box>
  )
}

export default About
