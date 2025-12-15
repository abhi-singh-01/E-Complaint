import {
  Typography,
  Box,
  Grid,
  Card,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  alpha
} from '@mui/material'
import {
  School,
  Security,
  Speed,
  Lightbulb,
  Handshake,
  EmojiEvents,
  GitHub,
  LinkedIn,
  Code,
  Favorite,
  Groups,
  Gavel,
  HistoryEdu,
  Visibility,
  Email,
  Phone,
  LocationOn,
  Support
} from '@mui/icons-material'
import { useTheme as useCustomTheme } from '../contexts/ThemeContext.jsx'
import { keyframes } from '@mui/system'

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.3); }
  50% { box-shadow: 0 0 40px rgba(25, 118, 210, 0.6); }
`

function About() {
  const theme = useTheme()
  const { isDarkMode } = useCustomTheme()

  // Unique content - different from Home page
  const whyChooseUs = [
    { icon: <Visibility />, title: "100% Transparency", description: "Track every step of your complaint journey", color: "#1976d2" },
    { icon: <Speed />, title: "Fast Resolution", description: "Average resolution time under 48 hours", color: "#2e7d32" },
    { icon: <Security />, title: "Data Privacy", description: "Your information stays confidential", color: "#d32f2f" },
    { icon: <Handshake />, title: "Fair Process", description: "Unbiased handling of all complaints", color: "#ed6c02" }
  ]

  const howItWorks = [
    { step: "1", title: "Register", description: "Create your account with college email", color: "#1976d2" },
    { step: "2", title: "Submit", description: "File your complaint with details", color: "#9c27b0" },
    { step: "3", title: "Track", description: "Monitor status in real-time", color: "#ed6c02" },
    { step: "4", title: "Resolve", description: "Get timely resolution", color: "#2e7d32" }
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

  // Theme-responsive card style
  const getCardStyle = (accentColor = theme.palette.primary.main) => ({
    background: isDarkMode
      ? `linear-gradient(145deg, ${alpha('#1e1e1e', 0.95)}, ${alpha('#2d2d2d', 0.95)})`
      : `linear-gradient(145deg, ${alpha('#ffffff', 0.95)}, ${alpha('#f8fafc', 0.95)})`,
    border: `1px solid ${alpha(accentColor, isDarkMode ? 0.3 : 0.15)}`,
    borderRadius: { xs: 2, md: 3 },
    boxShadow: isDarkMode
      ? `0 8px 32px ${alpha('#000', 0.3)}`
      : `0 8px 32px ${alpha(accentColor, 0.1)}`,
    transition: 'all 0.3s ease',
    '@media (hover: hover)': {
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: isDarkMode
          ? `0 16px 48px ${alpha(accentColor, 0.3)}`
          : `0 16px 48px ${alpha(accentColor, 0.2)}`
      }
    }
  })

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      background: isDarkMode
        ? 'linear-gradient(180deg, #0d1117 0%, #161b22 50%, #1f2937 100%)'
        : 'linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 50%, #cbd5e1 100%)',
      py: { xs: 4, sm: 6, md: 8 },
      px: { xs: 2, sm: 3, md: 6 }
    }}>

      {/* Hero Section - Different from Home */}
      <Box sx={{
        textAlign: 'center',
        mb: { xs: 6, md: 8 },
        animation: `${fadeInUp} 0.8s ease-out`
      }}>
        <Avatar sx={{
          width: { xs: 80, md: 100 },
          height: { xs: 80, md: 100 },
          mx: 'auto',
          mb: 3,
          background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
          animation: `${glow} 3s ease-in-out infinite`
        }}>
          <HistoryEdu sx={{ fontSize: { xs: 40, md: 50 }, color: '#fff' }} />
        </Avatar>
        <Typography variant="h3" sx={{
          fontWeight: 800,
          color: isDarkMode ? '#fff' : '#1e293b',
          mb: 2,
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
        }}>
          About Our Platform
        </Typography>
        <Typography variant="body1" sx={{
          color: isDarkMode ? alpha('#fff', 0.7) : '#64748b',
          maxWidth: 600,
          mx: 'auto',
          fontSize: { xs: '0.95rem', md: '1.1rem' },
          lineHeight: 1.7
        }}>
          Built by students, for students. We understand your challenges and created
          a platform that makes your voice heard.
        </Typography>
      </Box>

      {/* Why Choose Us - Unique Section */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          fontWeight: 700,
          color: isDarkMode ? '#fff' : '#1e293b',
          mb: { xs: 3, md: 4 },
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}>
          🎯 Why Choose Us?
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {whyChooseUs.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{
                ...getCardStyle(item.color),
                p: { xs: 1.5, md: 2.5 },
                height: { xs: 130, md: 150 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`
              }}>
                <Avatar sx={{
                  bgcolor: alpha(item.color, isDarkMode ? 0.3 : 0.15),
                  color: item.color,
                  width: { xs: 38, md: 45 },
                  height: { xs: 38, md: 45 },
                  mb: 1,
                  animation: `${float} 3s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}>
                  {item.icon}
                </Avatar>
                <Typography variant="h6" sx={{
                  fontWeight: 600,
                  color: isDarkMode ? '#fff' : '#1e293b',
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  mb: 0.5
                }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{
                  color: isDarkMode ? alpha('#fff', 0.6) : '#64748b',
                  fontSize: { xs: '0.7rem', md: '0.85rem' }
                }}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How It Works - Unique Process Section */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          fontWeight: 700,
          color: isDarkMode ? '#fff' : '#1e293b',
          mb: { xs: 3, md: 4 },
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}>
          📋 How It Works
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {howItWorks.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{
                ...getCardStyle(item.color),
                p: { xs: 1.5, md: 2.5 },
                height: { xs: 120, md: 140 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                animation: `${fadeInUp} 0.6s ease-out ${index * 0.15}s both`
              }}>
                <Avatar sx={{
                  bgcolor: item.color,
                  color: '#fff',
                  width: { xs: 35, md: 42 },
                  height: { xs: 35, md: 42 },
                  mb: 1,
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}>
                  {item.step}
                </Avatar>
                <Typography variant="h6" sx={{
                  fontWeight: 600,
                  color: isDarkMode ? '#fff' : '#1e293b',
                  fontSize: { xs: '0.9rem', md: '1.05rem' },
                  mb: 0.5
                }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{
                  color: isDarkMode ? alpha('#fff', 0.6) : '#64748b',
                  fontSize: { xs: '0.7rem', md: '0.8rem' }
                }}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Developers Section */}
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          fontWeight: 700,
          color: isDarkMode ? '#fff' : '#1e293b',
          mb: 1,
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}>
          👨‍💻 Meet The Team
        </Typography>
        <Typography variant="body2" sx={{
          textAlign: 'center',
          color: isDarkMode ? alpha('#fff', 0.6) : '#64748b',
          mb: { xs: 3, md: 4 }
        }}>
          The developers behind this platform
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {developers.map((dev, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Card sx={{
                ...getCardStyle(dev.color),
                p: { xs: 3, md: 4 },
                textAlign: 'center',
                animation: `${fadeInUp} 0.8s ease-out ${index * 0.2}s both`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${dev.color}, ${alpha(dev.color, 0.3)})`
                }
              }}>
                <Avatar sx={{
                  width: { xs: 80, md: 100 },
                  height: { xs: 80, md: 100 },
                  mx: 'auto',
                  mb: 2,
                  bgcolor: dev.color,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700,
                  boxShadow: `0 8px 24px ${alpha(dev.color, 0.4)}`,
                  animation: `${pulse} 3s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`
                }}>
                  {dev.avatar}
                </Avatar>
                <Typography variant="h5" sx={{
                  fontWeight: 700,
                  color: isDarkMode ? '#fff' : '#1e293b',
                  mb: 0.5,
                  fontSize: { xs: '1.1rem', md: '1.3rem' }
                }}>
                  {dev.name}
                </Typography>
                <Typography variant="body2" sx={{
                  color: dev.color,
                  fontWeight: 500,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5
                }}>
                  <Code sx={{ fontSize: 16 }} />
                  {dev.role}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {dev.skills.map((skill, i) => (
                    <Chip
                      key={i}
                      label={skill}
                      size="small"
                      sx={{
                        m: 0.3,
                        bgcolor: alpha(dev.color, isDarkMode ? 0.2 : 0.1),
                        color: dev.color,
                        fontWeight: 500,
                        fontSize: { xs: '0.7rem', md: '0.75rem' }
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton
                    href={dev.github}
                    target="_blank"
                    size="small"
                    sx={{
                      bgcolor: alpha(dev.color, isDarkMode ? 0.2 : 0.1),
                      color: dev.color,
                      '&:hover': { bgcolor: alpha(dev.color, 0.3) }
                    }}
                  >
                    <GitHub fontSize="small" />
                  </IconButton>
                  <IconButton
                    href={dev.linkedin}
                    target="_blank"
                    size="small"
                    sx={{
                      bgcolor: alpha(dev.color, isDarkMode ? 0.2 : 0.1),
                      color: dev.color,
                      '&:hover': { bgcolor: alpha(dev.color, 0.3) }
                    }}
                  >
                    <LinkedIn fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact Section */}
      <Card sx={{
        ...getCardStyle(),
        p: { xs: 3, md: 4 },
        textAlign: 'center',
        animation: `${fadeInUp} 0.8s ease-out`
      }}>
        <Avatar sx={{
          width: { xs: 60, md: 70 },
          height: { xs: 60, md: 70 },
          mx: 'auto',
          mb: 2,
          background: 'linear-gradient(135deg, #1976d2, #9c27b0)',
          animation: `${pulse} 2s ease-in-out infinite`
        }}>
          <Support sx={{ fontSize: { xs: 30, md: 35 }, color: '#fff' }} />
        </Avatar>
        <Typography variant="h5" sx={{
          fontWeight: 700,
          color: isDarkMode ? '#fff' : '#1976d2',
          mb: 1,
          fontSize: { xs: '1.2rem', md: '1.5rem' }
        }}>
          Need Help?
        </Typography>
        <Typography variant="body2" sx={{
          color: isDarkMode ? alpha('#fff', 0.6) : '#64748b',
          mb: 3,
          maxWidth: 400,
          mx: 'auto'
        }}>
          Contact us for any queries or support
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: { xs: 1, md: 2 },
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center'
        }}>
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
                py: { xs: 2, md: 2.5 },
                px: 1,
                bgcolor: alpha(item.color, isDarkMode ? 0.2 : 0.1),
                color: item.color,
                fontWeight: 500,
                fontSize: { xs: '0.75rem', md: '0.85rem' },
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 250, sm: 'none' },
                '& .MuiChip-icon': { color: item.color }
              }}
            />
          ))}
        </Box>
      </Card>

      {/* Footer Note */}
      <Box sx={{
        textAlign: 'center',
        mt: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5
      }}>
        <Typography variant="body2" sx={{
          color: isDarkMode ? alpha('#fff', 0.5) : '#94a3b8'
        }}>
          Made with
        </Typography>
        <Favorite sx={{ fontSize: 16, color: '#ef4444' }} />
        <Typography variant="body2" sx={{
          color: isDarkMode ? alpha('#fff', 0.5) : '#94a3b8'
        }}>
          by the E-Complaint Team
        </Typography>
      </Box>

    </Box>
  )
}

export default About
