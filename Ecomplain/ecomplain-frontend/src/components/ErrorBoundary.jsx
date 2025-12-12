import React from 'react'
import { Box, Typography, Button, Container, Paper } from '@mui/material'
import { ErrorOutline, Refresh, Home } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })

    // Optionally log to error reporting service
    // logErrorToService(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset)
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

const ErrorFallback = ({ error, errorInfo, onReset }) => {
  const navigate = useNavigate()
  const isDevelopment = import.meta.env.DEV

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <ErrorOutline
          sx={{
            fontSize: 64,
            color: 'error.main',
            mb: 2,
          }}
        />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          We're sorry for the inconvenience. The error has been logged and we'll look into it.
        </Typography>

        {isDevelopment && error && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: 'error.light',
              borderRadius: 1,
              textAlign: 'left',
              maxHeight: '300px',
              overflow: 'auto',
            }}
          >
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Error Details (Development Mode):
            </Typography>
            <Typography
              variant="body2"
              component="pre"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {error.toString()}
              {errorInfo?.componentStack && (
                <>
                  {'\n\n'}
                  Component Stack:
                  {errorInfo.componentStack}
                </>
              )}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={onReset}
            size="large"
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => {
              onReset()
              navigate('/')
            }}
            size="large"
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default ErrorBoundaryClass

