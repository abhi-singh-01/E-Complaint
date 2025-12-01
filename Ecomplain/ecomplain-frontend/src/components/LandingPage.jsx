import { Suspense, lazy } from 'react'
import { Box, CircularProgress } from '@mui/material'

// Lazy load section components
const HeroSection = lazy(() => import('./sections/HeroSection.jsx'))
const StatsSection = lazy(() => import('./sections/StatsSection.jsx'))
const FeaturesSection = lazy(() => import('./sections/FeaturesSection.jsx'))
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection.jsx'))
const CTASection = lazy(() => import('./sections/CTASection.jsx'))

function LandingPage() {
  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}><CircularProgress /></Box>}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}><CircularProgress /></Box>}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}><CircularProgress /></Box>}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}><CircularProgress /></Box>}>
        <CTASection />
      </Suspense>
    </Box>
  )
}

export default LandingPage
