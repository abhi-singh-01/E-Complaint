import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
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

// Core animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0.45); }
  50% { transform: scale(1.03); box-shadow: 0 0 40px 10px rgba(59,130,246,0.25); }
`

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

function About() {
  const { isDarkMode } = useCustomTheme()

  const stats = [
    { label: 'Complaints Resolved', value: '1.2K+', icon: <EmojiEvents />, color: '#22c55e' },
    { label: 'Avg. Response Time', value: '< 24 hrs', icon: <Speed />, color: '#f97316' },
    { label: 'Departments Onboarded', value: '25+', icon: <School />, color: '#3b82f6' },
    { label: 'Student Satisfaction', value: '4.8/5', icon: <Favorite />, color: '#ec4899' }
  ]

  const values = [
    {
      icon: <Visibility />,
      title: 'Radical Transparency',
      description: 'Every action is visible, every update is tracked, and every decision is documented. No more “lost” complaints.',
      color: '#3b82f6'
    },
    {
      icon: <Security />,
      title: 'Safe & Secure Voice',
      description: 'Enterprise‑grade security and role‑based access ensure your identity and data stay protected.',
      color: '#22c55e'
    },
    {
      icon: <Lightbulb />,
      title: 'Insight‑Driven Campus',
      description: 'Analytics turn individual complaints into patterns that help institutions improve policies and culture.',
      color: '#a855f7'
    },
    {
      icon: <Handshake />,
      title: 'Built For Collaboration',
      description: 'Students, mentors and administrators work together in one intuitive, guided workflow.',
      color: '#f97316'
    }
  ]

  const journeySteps = [
    {
      step: '01',
      title: 'You share your concern',
      description: 'Log in with your institute credentials and submit your issue with full context, category and attachments.',
      icon: <HistoryEdu />
    },
    {
      step: '02',
      title: 'Smart routing engine',
      description: 'Our logic routes the complaint directly to the correct department, HOD or authority – automatically.',
      icon: <Gavel />
    },
    {
      step: '03',
      title: 'Live tracking & updates',
      description: 'Track your case like a delivery – see which desk it is on, what changed and what is coming next.',
      icon: <Visibility />
    },
    {
      step: '04',
      title: 'Resolution & feedback',
      description: 'Get notified on every action and share feedback so we can keep improving the experience.',
      icon: <Support />
    }
  ]

  const team = [
    {
      name: 'Abhijeet Singh',
      role: 'Full Stack Architect',
      avatar: 'AS',
      color: '#3b82f6',
      skills: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/abhi-singh-01',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Abhishek Mishra',
      role: 'Full Stack Engineer',
      avatar: 'AM',
      color: '#a855f7',
      skills: ['React', 'Express', 'AWS'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  ]

  const getCardSx = (color) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    p: 3,
    height: '100%',
    border: `1px solid ${alpha(color, isDarkMode ? 0.4 : 0.18)}`,
    background: isDarkMode
      ? `linear-gradient(135deg, ${alpha('#020617', 0.9)}, ${alpha(color, 0.18)})`
      : `linear-gradient(135deg, rgba(255,255,255,0.98), ${alpha(color, 0.06)})`,
    boxShadow: `0 20px 50px ${alpha('#020617', isDarkMode ? 0.9 : 0.15)}`,
    backdropFilter: 'blur(18px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '-40%',
      background: `radial-gradient(circle at 0% 0%, ${alpha(color, 0.55)}, transparent 60%)`,
      opacity: isDarkMode ? 0.35 : 0.18,
      pointerEvents: 'none',
      animation: `${float} 12s ease-in-out infinite`
    },
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 28px 70px ${alpha(color, isDarkMode ? 0.7 : 0.25)}`,
      borderColor: alpha(color, 0.75)
    },
    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
  })

  const chipSx = (color) => ({
    bgcolor: alpha(color, isDarkMode ? 0.35 : 0.12),
    color,
    borderRadius: 999,
    px: 1.8,
    py: 0.4,
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.8,
    border: `1px solid ${alpha(color, 0.6)}`
  })

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        py: { xs: 6, md: 10 },
        px: { xs: 2.5, sm: 4, md: 8 },
        background: isDarkMode
          ? 'radial-gradient(circle at 0% 0%, #1d4ed8 0, transparent 55%), radial-gradient(circle at 100% 100%, #22c55e 0, #020617 55%)'
          : 'radial-gradient(circle at 0% 0%, #bfdbfe 0, transparent 55%), radial-gradient(circle at 100% 100%, #fee2e2 0, #f9fafb 55%)'
      }}
    >
      {/* Soft animated sheen */}
      <Box
        sx={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage:
            'linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent)',
          backgroundSize: '200% 100%',
          mixBlendMode: isDarkMode ? 'screen' : 'overlay',
          opacity: 0.5,
          animation: `${shimmer} 18s linear infinite`,
          pointerEvents: 'none'
        }}
      />

      <Box
        sx={{
          position: 'relative',
          maxWidth: 1240,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 8, md: 10 }
        }}
      >
        {/* HERO SECTION */}
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          sx={{ animation: `${fadeInUp} 0.8s ease-out` }}
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2.5 }}>
              <Box sx={chipSx('#3b82f6')}>
                <Code fontSize="small" />
                Built by students • Optimized for campus life
              </Box>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.04em',
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                lineHeight: 1.05,
                mb: 2,
                color: isDarkMode ? '#e5e7eb' : '#0f172a'
              }}
            >
              Turn{' '}
              <Box
                component="span"
                sx={{
                  backgroundImage:
                    'linear-gradient(120deg, #3b82f6, #8b5cf6, #ec4899)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                every complaint
              </Box>{' '}
              into clear, trackable action.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? alpha('#e5e7eb', 0.8) : '#4b5563',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                maxWidth: 540,
                mb: 3
              }}
            >
              E‑Complain is your digital bridge between students and college
              authorities. No more paper forms, office queues or wondering what
              happened to your issue – just raise, track and resolve from
              anywhere.
            </Typography>

            <Grid container spacing={2.5} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    ...chipSx('#22c55e'),
                    width: '100%',
                    justifyContent: 'flex-start',
                    animation: `${pulse} 3.2s ease-in-out infinite`
                  }}
                >
                  <Speed fontSize="small" />
                  Live status & instant updates
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    ...chipSx('#a855f7'),
                    width: '100%',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Security fontSize="small" />
                  Fully secure & role‑based
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: { xs: 'stretch', sm: 'center' }
              }}
            >
              {/* CTA button (non‑navigating, just visual) */}
              <Box
                component="button"
                sx={{
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 999,
                  px: 4,
                  py: 1.4,
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                  color: '#0b1120',
                  backgroundImage:
                    'linear-gradient(120deg, #3b82f6, #6366f1, #ec4899)',
                  backgroundSize: '200% 200%',
                  boxShadow: '0 18px 45px rgba(79,70,229,0.5)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    backgroundPosition: '100% 0',
                    transform: 'translateY(-2px) scale(1.01)',
                    boxShadow: '0 22px 55px rgba(79,70,229,0.65)'
                  }
                }}
              >
                Start your first complaint
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: 13
                }}
              >
                <Groups fontSize="small" sx={{ color: '#22c55e' }} />
                <span>Trusted by students & faculties across campus</span>
              </Box>
            </Box>
          </Grid>

          {/* Animated glass panel illustration */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 520,
                mx: { xs: 'auto', md: 'unset' },
                height: { xs: 320, sm: 380, md: 420 }
              }}
            >
              {/* Main glass board */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: { xs: '10%', md: '8%' },
                  borderRadius: 5,
                  background: isDarkMode
                    ? alpha('#020617', 0.9)
                    : 'rgba(255,255,255,0.9)',
                  boxShadow: `0 25px 60px ${alpha('#020617', isDarkMode ? 0.9 : 0.18)}`,
                  border: `1px solid ${alpha('#e5e7eb', isDarkMode ? 0.12 : 0.5)}`,
                  backdropFilter: 'blur(22px)',
                  p: 3.2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  animation: `${float} 14s ease-in-out infinite`
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                    >
                      Live Case Board
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: isDarkMode ? '#e5e7eb' : '#0f172a'
                      }}
                    >
                      Today&apos;s Overview
                    </Typography>
                  </Box>
                  <Chip
                    icon={<Support fontSize="small" />}
                    label="Real‑time"
                    sx={chipSx('#22c55e')}
                  />
                </Box>

                <Grid container spacing={2}>
                  {stats.map((item) => (
                    <Grid item xs={6} key={item.label}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          background: alpha(item.color, isDarkMode ? 0.24 : 0.08),
                          border: `1px solid ${alpha(item.color, 0.4)}`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.6
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 26,
                              height: 26,
                              borderRadius: '999px',
                              bgcolor: alpha(item.color, isDarkMode ? 0.5 : 0.2),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#0f172a'
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: isDarkMode ? '#e5e7eb' : '#111827',
                              fontWeight: 600
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box
                  sx={{
                    mt: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Avatar
                      sx={{
                        bgcolor: '#3b82f6',
                        width: 30,
                        height: 30,
                        fontSize: 14,
                        fontWeight: 700,
                        boxShadow: '0 0 0 3px rgba(59,130,246,0.35)'
                      }}
                    >
                      ES
                    </Avatar>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: isDarkMode ? '#e5e7eb' : '#0f172a', fontWeight: 600 }}
                      >
                        You just raised a ticket
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                      >
                        Auto‑assigned to &quot;Hostel Admin&quot;
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={chipSx('#f97316')}>Tracking ID • EC‑2043</Box>
                </Box>
              </Box>

              {/* Floating accent cards */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '4%',
                  right: { xs: '2%', md: '-4%' },
                  width: 160,
                  p: 1.5,
                  borderRadius: 4,
                  bgcolor: isDarkMode ? '#020617' : 'rgba(15,23,42,0.96)',
                  color: '#e5e7eb',
                  boxShadow: '0 18px 38px rgba(15,23,42,0.7)',
                  display: { xs: 'none', sm: 'flex' },
                  flexDirection: 'column',
                  gap: 0.6,
                  animation: `${float} 9s ease-in-out infinite`,
                  animationDelay: '0.4s'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Gavel fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Dean Office
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                  &quot;Issue acknowledged – under review&quot;
                </Typography>
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: '2%',
                  left: { xs: '-2%', md: '-6%' },
                  width: 185,
                  p: 1.6,
                  borderRadius: 4,
                  bgcolor: isDarkMode
                    ? 'rgba(15,23,42,0.96)'
                    : 'rgba(255,255,255,0.98)',
                  boxShadow: '0 20px 40px rgba(15,23,42,0.55)',
                  display: { xs: 'none', sm: 'flex' },
                  flexDirection: 'column',
                  gap: 1,
                  animation: `${float} 11s ease-in-out infinite`,
                  animationDelay: '0.9s'
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: isDarkMode ? '#e5e7eb' : '#111827' }}
                >
                  Campus Pulse
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 4,
                      borderRadius: 999,
                      overflow: 'hidden',
                      bgcolor: alpha('#6b7280', 0.25)
                    }}
                  >
                    <Box
                      sx={{
                        width: '80%',
                        height: '100%',
                        borderRadius: 'inherit',
                        backgroundImage:
                          'linear-gradient(90deg,#22c55e,#a3e635,#facc15,#f97316)',
                        animation: `${shimmer} 4s linear infinite`
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: '#22c55e' }}
                  >
                    Live
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* VALUES SECTION */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: { xs: '1.9rem', md: '2.3rem' },
              mb: 1.2,
              color: isDarkMode ? '#e5e7eb' : '#0f172a'
            }}
          >
            What makes E‑Complain different?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              maxWidth: 620,
              mx: 'auto',
              color: isDarkMode ? '#9ca3af' : '#6b7280',
              mb: 4
            }}
          >
            More than a ticketing tool – it&apos;s a carefully crafted, student‑first
            experience that brings clarity, empathy and speed to every
            conversation.
          </Typography>

          <Grid container spacing={3.2}>
            {values.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <Card sx={getCardSx(item.color)}>
                  <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                    <Box
                      sx={{
                        mb: 2,
                        width: 44,
                        height: 44,
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(item.color, isDarkMode ? 0.35 : 0.2),
                        color: isDarkMode ? '#e5e7eb' : '#0f172a',
                        boxShadow: `0 10px 26px ${alpha(item.color, 0.45)}`
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: isDarkMode ? '#e5e7eb' : '#0f172a'
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? '#9ca3af' : '#6b7280',
                        lineHeight: 1.7,
                        fontSize: 13.5
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* JOURNEY TIMELINE */}
        <Box>
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            alignItems="flex-start"
          >
            <Grid item xs={12} md={5}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.9rem', md: '2.2rem' },
                  mb: 1,
                  color: isDarkMode ? '#e5e7eb' : '#0f172a'
                }}
              >
                A simple journey from{' '}
                <Box
                  component="span"
                  sx={{
                    backgroundImage:
                      'linear-gradient(120deg,#22c55e,#a855f7,#0ea5e9)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  problem to progress
                </Box>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                Every screen, email and notification is designed so that you
                always know what&apos;s happening, who&apos;s responsible and what
                comes next.
              </Typography>
              <Box sx={chipSx('#0ea5e9')}>
                <HistoryEdu fontSize="small" />
                End‑to‑end guided experience
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  position: 'relative',
                  pl: { xs: 0, md: 3 },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: { xs: '12px', md: '24px' },
                    top: 6,
                    bottom: 6,
                    width: 2,
                    bgcolor: alpha('#64748b', 0.4)
                  }
                }}
              >
                {journeySteps.map((step, idx) => (
                  <Box
                    key={step.step}
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      gap: 2.5,
                      mb: idx === journeySteps.length - 1 ? 0 : 3.2
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        mt: 0.5,
                        flexShrink: 0
                      }}
                    >
                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: '999px',
                          bgcolor: isDarkMode ? '#020617' : '#0f172a',
                          border: '2px solid #22c55e',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#22c55e',
                          fontSize: 11,
                          fontWeight: 700,
                          boxShadow: '0 0 0 4px rgba(34,197,94,0.15)'
                        }}
                      >
                        {step.step}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        p: 2.4,
                        borderRadius: 3,
                        background: isDarkMode
                          ? 'rgba(15,23,42,0.95)'
                          : 'rgba(255,255,255,0.98)',
                        border: `1px solid ${alpha('#1f2937', 0.14)}`,
                        boxShadow: `0 12px 30px ${alpha('#020617', isDarkMode ? 0.8 : 0.18)}`
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 1
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: isDarkMode ? '#e5e7eb' : '#0f172a'
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: '999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha('#22c55e', 0.12),
                            color: '#22c55e'
                          }}
                        >
                          {step.icon}
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode ? '#9ca3af' : '#6b7280',
                          mb: 1.2
                        }}
                      >
                        {step.description}
                      </Typography>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.8,
                          fontSize: 11,
                          color: isDarkMode ? '#6b7280' : '#9ca3af',
                          textTransform: 'uppercase',
                          letterSpacing: 0.6
                        }}
                      >
                        <span>Step {idx + 1}</span>
                        <Box
                          component="span"
                          sx={{
                            width: 4,
                            height: 4,
                            borderRadius: '999px',
                            bgcolor: '#22c55e'
                          }}
                        />
                        <span>Guided</span>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* TEAM & TECH SECTION */}
        <Box>
          <Grid container spacing={{ xs: 4, md: 5 }} alignItems="stretch">
            {/* Team */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.9rem', md: '2.1rem' },
                  mb: 1,
                  color: isDarkMode ? '#e5e7eb' : '#0f172a'
                }}
              >
                The makers behind the platform
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  mb: 3
                }}
              >
                A small, focused team of engineers and students who have lived
                through the very problems this platform solves.
              </Typography>

              <Grid container spacing={3}>
                {team.map((dev) => (
                  <Grid item xs={12} sm={6} key={dev.name}>
                    <Card sx={getCardSx(dev.color)}>
                      <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: dev.color,
                              width: 52,
                              height: 52,
                              fontWeight: 700,
                              fontSize: 20,
                              boxShadow: `0 12px 28px ${alpha(dev.color, 0.6)}`
                            }}
                          >
                            {dev.avatar}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                color: isDarkMode ? '#e5e7eb' : '#0f172a'
                              }}
                            >
                              {dev.name}
                            </Typography>
                            <Box sx={chipSx(dev.color)}>
                              <Code fontSize="small" />
                              {dev.role}
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          {dev.skills.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{
                                mr: 1,
                                mb: 1,
                                bgcolor: alpha(dev.color, isDarkMode ? 0.35 : 0.15),
                                color: isDarkMode ? '#e5e7eb' : '#0f172a',
                                fontSize: 11,
                                fontWeight: 600
                              }}
                            />
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                          <IconButton
                            href={dev.github}
                            target="_blank"
                            sx={{
                              bgcolor: alpha(dev.color, isDarkMode ? 0.4 : 0.16),
                              color: isDarkMode ? '#e5e7eb' : '#0f172a',
                              '&:hover': {
                                bgcolor: alpha(dev.color, 0.65),
                                transform: 'translateY(-2px)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <GitHub />
                          </IconButton>
                          <IconButton
                            href={dev.linkedin}
                            target="_blank"
                            sx={{
                              bgcolor: alpha(dev.color, isDarkMode ? 0.4 : 0.16),
                              color: isDarkMode ? '#e5e7eb' : '#0f172a',
                              '&:hover': {
                                bgcolor: alpha(dev.color, 0.65),
                                transform: 'translateY(-2px)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <LinkedIn />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Tech & Support */}
            <Grid item xs={12} md={5}>
              <Card sx={getCardSx('#0ea5e9')}>
                <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textTransform: 'uppercase',
                      letterSpacing: 0.6,
                      mb: 1,
                      color: isDarkMode ? '#a5b4fc' : '#2563eb',
                      fontWeight: 600
                    }}
                  >
                    Modern Tech Stack
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: isDarkMode ? '#e5e7eb' : '#0f172a'
                    }}
                  >
                    Fast, secure and built to scale with your institution.
                  </Typography>

                  <Grid container spacing={1.2} sx={{ mb: 3 }}>
                    {[
                      { label: 'React + Vite', icon: <Code />, color: '#3b82f6' },
                      { label: 'Node & Express', icon: <Code />, color: '#22c55e' },
                      { label: 'MongoDB', icon: <Code />, color: '#f97316' },
                      { label: 'JWT Security', icon: <Security />, color: '#0ea5e9' }
                    ].map((item) => (
                      <Grid item xs={6} key={item.label}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 1.2,
                            borderRadius: 999,
                            bgcolor: alpha(item.color, isDarkMode ? 0.32 : 0.16)
                          }}
                        >
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              borderRadius: '999px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: alpha('#020617', 0.85),
                              color: item.color
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              color: isDarkMode ? '#e5e7eb' : '#0f172a'
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Box
                    sx={{
                      mt: 1.5,
                      p: 2,
                      borderRadius: 3,
                      bgcolor: isDarkMode
                        ? 'rgba(15,23,42,0.96)'
                        : 'rgba(15,23,42,0.96)',
                      color: '#e5e7eb',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.4
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Support fontSize="small" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Always‑on support for your campus
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                      Need help, have a feature idea or found an issue? Reach out –
                      we&apos;re actively improving E‑Complain with your feedback.
                    </Typography>
                    <Grid container spacing={1.2} sx={{ mt: 0.5 }}>
                      {[
                        {
                          icon: <Email fontSize="small" />,
                          label: 'support@ecomplaint.edu'
                        },
                        {
                          icon: <Phone fontSize="small" />,
                          label: '+91 1234567890'
                        },
                        {
                          icon: <LocationOn fontSize="small" />,
                          label: 'Campus Helpdesk • 09:00 – 18:00'
                        }
                      ].map((item) => (
                        <Grid item xs={12} key={item.label}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              fontSize: 13,
                              color: '#e5e7eb'
                            }}
                          >
                            <Box
                              sx={{
                                width: 22,
                                height: 22,
                                borderRadius: '999px',
                                bgcolor: 'rgba(15,23,42,0.8)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {item.icon}
                            </Box>
                            <span>{item.label}</span>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default About


