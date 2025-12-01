import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api.js'
import { useAuth } from '../../auth/AuthContext.jsx'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Tab,
  Tabs,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  CircularProgress,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import {
  BarChart,
  List as ListIcon,
  Add,
  TrendingUp,
  CheckCircle,
  Pending,
  Cancel,
  Assignment,
  Person,
  Email,
  School,
  CalendarToday,
  PriorityHigh,
  Category,
  Description,
  Refresh,
  Send,
  Edit,
  Close
} from '@mui/icons-material'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const { user, setToken, setUser } = useAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  
  // New complaint form state
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    category: '',
    priority: 'Medium',
    description: '',
    isPublic: false,
    anonymous: false
  })

  // Form validation errors
  const [formErrors, setFormErrors] = useState({
    title: '',
    category: '',
    description: ''
  })

  // Edit complaint state
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingComplaint, setEditingComplaint] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    priority: 'Medium',
    description: ''
  })
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
      try {
      setLoading(true)
        const { data } = await api.get('/api/dashboard')
        setData(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Real-time validation
  const validateField = (field, value) => {
    const newErrors = { ...formErrors }
    
    switch (field) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Title is required'
        } else if (value.trim().length < 5) {
          newErrors.title = `Title must be at least 5 characters (${value.trim().length}/5)`
        } else {
          newErrors.title = ''
        }
        break
      case 'category':
        if (!value) {
          newErrors.category = 'Category is required'
        } else {
          newErrors.category = ''
        }
        break
      case 'description':
        if (!value.trim()) {
          newErrors.description = 'Description is required'
        } else if (value.trim().length < 10) {
          newErrors.description = `Description must be at least 10 characters (${value.trim().length}/10)`
        } else {
          newErrors.description = ''
        }
        break
      default:
        break
    }
    
    setFormErrors(newErrors)
  }

  // Check if form is valid
  const isFormValid = () => {
    return (
      complaintForm.title.trim().length >= 5 &&
      complaintForm.category &&
      complaintForm.description.trim().length >= 10 &&
      complaintForm.priority &&
      !formErrors.title &&
      !formErrors.category &&
      !formErrors.description
    )
  }

  const handleComplaintSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('') // Clear any previous errors
    
    // Validate all fields
    validateField('title', complaintForm.title)
    validateField('category', complaintForm.category)
    validateField('description', complaintForm.description)
    
    // Check if form is valid
    if (!isFormValid()) {
      setError('Please fill all required fields correctly')
      setSubmitting(false)
      return
    }
    
    try {
      console.log('Submitting complaint:', complaintForm) // Debug log
      const response = await api.post('/api/complaints', complaintForm)
      console.log('Complaint submitted successfully:', response.data) // Debug log
      
      setComplaintForm({ title: '', category: '', priority: 'Medium', description: '', isPublic: false, anonymous: false })
      setFormErrors({ title: '', category: '', description: '' })
      await loadDashboardData() // Refresh data
      setActiveTab(0) // Switch to Overview tab
    } catch (err) {
      console.error('Complaint submission error:', err.response?.data) // Debug log
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || 'Failed to submit complaint'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return <CheckCircle />
      case 'pending': return <Pending />
      case 'rejected': return <Cancel />
      default: return <Assignment />
    }
  }

  const handleEditClick = (complaint) => {
    // Double-check if complaint can be edited before opening dialog
    if (!canEditComplaint(complaint)) {
      setError('Cannot edit complaint. It has been forwarded to higher authority and is under review.')
      return
    }
    
    setEditingComplaint(complaint)
    setEditForm({
      title: complaint.title,
      category: complaint.category,
      priority: complaint.priority,
      description: complaint.description
    })
    setError('') // Clear any previous errors
    setEditDialogOpen(true)
  }

  const handleEditClose = () => {
    setEditDialogOpen(false)
    setEditingComplaint(null)
    setEditForm({
      title: '',
      category: '',
      priority: 'Medium',
      description: ''
    })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editingComplaint) return

    // Double-check if complaint can still be edited before submitting
    if (!canEditComplaint(editingComplaint)) {
      setError('Cannot edit complaint. It has been forwarded to higher authority and is under review.')
      setUpdating(false)
      return
    }

    setUpdating(true)
    setError('')

    // Validation
    if (!editForm.title.trim() || editForm.title.trim().length < 5) {
      setError('Title must be at least 5 characters long')
      setUpdating(false)
      return
    }

    if (!editForm.category) {
      setError('Category is required')
      setUpdating(false)
      return
    }

    if (!editForm.description.trim() || editForm.description.trim().length < 10) {
      setError('Description must be at least 10 characters long')
      setUpdating(false)
      return
    }

    try {
      await api.put(`/api/complaints/${editingComplaint._id}`, editForm)
      await loadDashboardData() // Refresh data
      handleEditClose()
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || 'Failed to update complaint'
      setError(errorMessage)
    } finally {
      setUpdating(false)
    }
  }

  const canEditComplaint = (complaint) => {
    if (!complaint) return false
    
    // Students cannot edit complaints that have been forwarded to Dean or Additional HOD
    // Handle both object and string formats for workflow
    const workflow = complaint.workflow || {}
    const workflowLevel = workflow.currentLevel || complaint.workflow?.currentLevel || ''
    
    // Check if complaint has been forwarded to higher authority
    if (workflowLevel === 'dean' || workflowLevel === 'additional_hod') {
      return false
    }
    
    // Students can only edit complaints that are Pending or In Progress and still at coordinator level
    const status = complaint.status || ''
    const isPendingOrInProgress = status === 'Pending' || status === 'In Progress' || status.toLowerCase() === 'pending' || status.toLowerCase() === 'in progress'
    
    // Allow editing only if at coordinator level (or no workflow level set, which means coordinator)
    const isAtCoordinatorLevel = !workflowLevel || workflowLevel === 'coordinator' || workflowLevel === ''
    
    return isPendingOrInProgress && isAtCoordinatorLevel
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ 
        width: '100vw',
        margin: 0,
        padding: 0,
        py: 4,
        px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }
      }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (!data) return null

  const { student, stats, complaints } = data

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      width: '100vw',
      margin: 0,
      padding: 0
    }}>
      <Box sx={{ 
        width: '100%', 
        py: 4, 
        px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Student Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back, {student.firstName} {student.lastName}
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'medium',
                minHeight: '64px',
                padding: '12px 16px',
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  color: '#1976d2',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  borderBottom: '3px solid #1976d2'
                },
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.05)',
                  color: '#1976d2'
                }
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              }
            }}
          >
            <Tab 
              icon={<BarChart />} 
              label="Overview" 
              iconPosition="start"
            />
            <Tab 
              icon={<ListIcon />} 
              label="My Complaints" 
              iconPosition="start"
            />
            <Tab 
              icon={<Add />} 
              label="+ New Complaint" 
              iconPosition="start"
            />
            <Tab 
              icon={<TrendingUp />} 
              label="Analytics" 
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Paper sx={{ p: 3 }}>
          {/* Overview Tab */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Overview
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={loadDashboardData}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: '600'
                  }}
                >
                  Refresh
                </Button>
              </Box>
              
              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} lg={3}>
                  <Card 
                    sx={{ 
                      backgroundColor: '#e3f2fd',
                      minHeight: '140px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.25)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{ 
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            Total Complaints
                          </Typography>
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              fontWeight: 'bold', 
                              color: '#1976d2',
                              fontSize: '2.5rem',
                              lineHeight: 1.2
                            }}
                          >
                            {stats.totalComplaints || 0}
                          </Typography>
                        </Box>
                        <Assignment sx={{ fontSize: 48, color: '#1976d2', opacity: 0.8 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        All submitted complaints
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} lg={3}>
                  <Card 
                    sx={{ 
                      backgroundColor: '#fff3e0',
                      minHeight: '140px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(245, 124, 0, 0.15)',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(245, 124, 0, 0.25)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{ 
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            Pending
                          </Typography>
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              fontWeight: 'bold', 
                              color: '#f57c00',
                              fontSize: '2.5rem',
                              lineHeight: 1.2
                            }}
                          >
                            {stats.pendingComplaints || 0}
                          </Typography>
                        </Box>
                        <Pending sx={{ fontSize: 48, color: '#f57c00', opacity: 0.8 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Awaiting response
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} lg={3}>
                  <Card 
                    sx={{ 
                      backgroundColor: '#e8f5e8',
                      minHeight: '140px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(46, 125, 50, 0.25)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{ 
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            Resolved
                          </Typography>
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              fontWeight: 'bold', 
                              color: '#2e7d32',
                              fontSize: '2.5rem',
                              lineHeight: 1.2
                            }}
                          >
                            {stats.resolvedComplaints || 0}
                          </Typography>
                        </Box>
                        <CheckCircle sx={{ fontSize: 48, color: '#2e7d32', opacity: 0.8 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Successfully resolved
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} lg={3}>
                  <Card 
                    sx={{ 
                      backgroundColor: '#ffebee',
                      minHeight: '140px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(211, 47, 47, 0.15)',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(211, 47, 47, 0.25)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{ 
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            Rejected
                          </Typography>
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              fontWeight: 'bold', 
                              color: '#d32f2f',
                              fontSize: '2.5rem',
                              lineHeight: 1.2
                            }}
                          >
                            {stats.rejectedComplaints || 0}
                          </Typography>
                        </Box>
                        <Cancel sx={{ fontSize: 48, color: '#d32f2f', opacity: 0.8 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Not applicable
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Student Info */}
              <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
                    Student Information
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Person sx={{ fontSize: 28, color: '#1976d2' }} />
                        <Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: '0.9rem', 
                              fontWeight: '600', 
                              color: 'text.secondary',
                              mb: 0.5
                            }}
                          >
                            Name
                          </Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 'bold', 
                              fontSize: '1.1rem',
                              color: 'text.primary'
                            }}
                          >
                            {student.firstName} {student.lastName}
                          </Typography>
                      </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Email sx={{ fontSize: 28, color: '#1976d2' }} />
                        <Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: '0.9rem', 
                              fontWeight: '600', 
                              color: 'text.secondary',
                              mb: 0.5
                            }}
                          >
                            Email
                          </Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 'bold', 
                              fontSize: '1.1rem',
                              color: 'text.primary'
                            }}
                          >
                            {student.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <School sx={{ fontSize: 28, color: '#1976d2' }} />
                        <Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: '0.9rem', 
                              fontWeight: '600', 
                              color: 'text.secondary',
                              mb: 0.5
                            }}
                          >
                            Department
                          </Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 'bold', 
                              fontSize: '1.1rem',
                              color: 'text.primary'
                            }}
                          >
                            {student.department}
                          </Typography>
                      </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Assignment sx={{ fontSize: 28, color: '#1976d2' }} />
                        <Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: '0.9rem', 
                              fontWeight: '600', 
                              color: 'text.secondary',
                              mb: 0.5
                            }}
                          >
                            Roll Number
                          </Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 'bold', 
                              fontSize: '1.1rem',
                              color: 'text.primary'
                            }}
                          >
                            {student.rollNo}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Recent Complaints */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Recent Complaints
                  </Typography>
                  {complaints && complaints.length > 0 ? (
                    <List>
                      {complaints.slice(0, 3).map((complaint, index) => (
                        <Box key={complaint._id}>
                          <ListItem>
                            <ListItemIcon>
                              {getStatusIcon(complaint.status)}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                  <Typography variant="body1" sx={{ fontWeight: '600', flex: 1 }}>
                                    {complaint.title}
                                  </Typography>
                                  <Chip 
                                    label={complaint.status} 
                                    color={getStatusColor(complaint.status)}
                                    size="small"
                                  />
                                  {canEditComplaint(complaint) && (
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      startIcon={<Edit />}
                                      onClick={() => handleEditClick(complaint)}
                                      sx={{
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        ml: 1
                                      }}
                                    >
                                      Edit
                                    </Button>
                                  )}
                                </Box>
                              }
                              secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                  <Typography variant="caption" color="text.secondary">
                                    {new Date(complaint.createdAt).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                          {index < complaints.slice(0, 3).length - 1 && <Divider />}
                        </Box>
                      ))}
                    </List>
                  ) : (
                    <Typography color="text.secondary">No complaints submitted yet.</Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          )}

          {/* My Complaints Tab */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  My Complaints
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={loadDashboardData}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: '600'
                  }}
                >
                  Refresh
                </Button>
              </Box>
              
              {complaints && complaints.length > 0 ? (
                <List>
                  {complaints.map((complaint, index) => (
                    <Box key={complaint._id}>
                      <ListItem sx={{ py: 3, px: 2 }}>
                        <ListItemIcon sx={{ minWidth: 48 }}>
                          <Box sx={{ fontSize: '2rem' }}>
                          {getStatusIcon(complaint.status)}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                              <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.4rem', flex: 1 }}>
                                {complaint.title}
                              </Typography>
                              <Chip 
                                label={complaint.status} 
                                color={getStatusColor(complaint.status)}
                                size="medium"
                                sx={{ fontSize: '0.9rem', fontWeight: '600' }}
                              />
                              {canEditComplaint(complaint) && (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<Edit />}
                                  onClick={() => handleEditClick(complaint)}
                                  sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: '600',
                                    ml: 1
                                  }}
                                >
                                  Edit
                                </Button>
                              )}
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 2 }}>
                              <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                sx={{ 
                                  mb: 2, 
                                  fontSize: '1.1rem',
                                  lineHeight: 1.6,
                                  fontWeight: '400'
                                }}
                              >
                                {complaint.description}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Category sx={{ fontSize: '1.2rem' }} />
                                  <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: '500' }}>
                                    {complaint.category}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <PriorityHigh sx={{ fontSize: '1.2rem' }} />
                                  <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: '500' }}>
                                    {complaint.priority}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <CalendarToday sx={{ fontSize: '1.2rem' }} />
                                  <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: '500' }}>
                                    {new Date(complaint.createdAt).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < complaints.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Assignment sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
                  <Typography variant="h4" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    No complaints submitted yet
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontSize: '1.2rem' }}>
                    Submit your first complaint to get started
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    onClick={() => setActiveTab(2)}
                    size="large"
                    sx={{ 
                      fontSize: '1.1rem',
                      px: 4,
                      py: 1.5,
                      fontWeight: 'bold'
                    }}
                  >
                    Submit New Complaint
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {/* New Complaint Tab */}
          {activeTab === 2 && (
            <Box>
              {/* Form Card */}
              <Card sx={{ 
                borderRadius: '16px',
                boxShadow: (theme) => theme.palette.mode === 'dark' 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: (theme) => theme.palette.mode === 'dark'
                  ? '1px solid rgba(25, 118, 210, 0.3)'
                  : '1px solid rgba(25, 118, 210, 0.1)',
                overflow: 'hidden',
                backgroundColor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(30, 30, 30, 0.8)' 
                  : '#fafafa',
                position: 'relative',
                minHeight: '100vh',
                paddingBottom: '80px'
              }}>
                <CardContent sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleComplaintSubmit}>
                    {error && (
                      <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                      </Alert>
                    )}
                <Grid container spacing={3}>
                      {/* Title Field */}
                  <Grid item xs={12}>
                        <Box sx={{ 
                          mb: 2, 
                          p: 3, 
                          backgroundColor: (theme) => theme.palette.mode === 'dark' 
                            ? 'rgba(45, 45, 45, 0.8)' 
                            : 'white', 
                          borderRadius: '12px',
                          border: (theme) => theme.palette.mode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.1)'
                            : '1px solid rgba(0, 0, 0, 0.05)',
                          boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                            : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: '600', color: '#1976d2', mb: 1 }}>
                            <Assignment sx={{ mr: 1, verticalAlign: 'middle' }} />
                            Complaint Title
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Provide a clear, concise title for your complaint
                          </Typography>
                    <TextField
                      fullWidth
                      required
                      label="Complaint Title *"
                      value={complaintForm.title}
                      onChange={(e) => {
                        setComplaintForm({...complaintForm, title: e.target.value})
                        validateField('title', e.target.value)
                      }}
                      error={!!formErrors.title}
                      helperText={formErrors.title || (complaintForm.title.trim() ? `${complaintForm.title.trim().length}/5 characters minimum` : 'Minimum 5 characters required')}
                      placeholder="e.g., Library computer not working, Hostel water issue, etc."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          fontSize: '1.1rem',
                          backgroundColor: (theme) => theme.palette.mode === 'dark' 
                            ? 'rgba(60, 60, 60, 0.8)' 
                            : 'white',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                        </Box>
                  </Grid>
                  
                      {/* Category and Priority Row */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ 
                          mb: 2, 
                          p: 3, 
                          backgroundColor: (theme) => theme.palette.mode === 'dark' 
                            ? 'rgba(45, 45, 45, 0.8)' 
                            : 'white', 
                          borderRadius: '12px',
                          border: (theme) => theme.palette.mode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.1)'
                            : '1px solid rgba(0, 0, 0, 0.05)',
                          boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                            : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: '600', color: '#1976d2', mb: 1 }}>
                            <Category sx={{ mr: 1, verticalAlign: 'middle' }} />
                            Category
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Select the most relevant category
                          </Typography>
                        <FormControl 
                          fullWidth 
                          required
                          error={!!formErrors.category}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              fontSize: '1.1rem',
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1976d2',
                                borderWidth: '2px'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1976d2',
                                borderWidth: '2px'
                              }
                            }
                          }}
                        >
                          <InputLabel>Choose Category</InputLabel>
                      <Select
                        value={complaintForm.category}
                            label="Choose Category *"
                        onChange={(e) => {
                          setComplaintForm({...complaintForm, category: e.target.value})
                          validateField('category', e.target.value)
                        }}
                          >
                            <MenuItem value="Academic">📚 Academic</MenuItem>
                            <MenuItem value="Administration">🏢 Administration</MenuItem>
                            <MenuItem value="Infrastructure">🏗️ Infrastructure</MenuItem>
                            <MenuItem value="Library">📖 Library</MenuItem>
                            <MenuItem value="Hostel">🏠 Hostel</MenuItem>
                            <MenuItem value="Cafeteria">🍽️ Cafeteria</MenuItem>
                            <MenuItem value="Transport">🚌 Transport</MenuItem>
                            <MenuItem value="Faculty">👨‍🏫 Faculty</MenuItem>
                            <MenuItem value="Examination">📝 Examination</MenuItem>
                            <MenuItem value="Fee">💰 Fee</MenuItem>
                            <MenuItem value="Other">📋 Other</MenuItem>
                      </Select>
                    </FormControl>
                        </Box>
                  </Grid>
                  
                      <Grid item xs={12} md={6}>
                        <Box sx={{ 
                          mb: 2, 
                          p: 3, 
                          backgroundColor: (theme) => theme.palette.mode === 'dark' 
                            ? 'rgba(45, 45, 45, 0.8)' 
                            : 'white', 
                          borderRadius: '12px',
                          border: (theme) => theme.palette.mode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.1)'
                            : '1px solid rgba(0, 0, 0, 0.05)',
                          boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                            : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: '600', color: '#1976d2', mb: 1 }}>
                            <PriorityHigh sx={{ mr: 1, verticalAlign: 'middle' }} />
                            Priority Level
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            How urgent is this issue?
                          </Typography>
                        <FormControl 
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              fontSize: '1.1rem',
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1976d2',
                                borderWidth: '2px'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1976d2',
                                borderWidth: '2px'
                              }
                            }
                          }}
                        >
                          <InputLabel>Select Priority</InputLabel>
                      <Select
                        value={complaintForm.priority}
                            label="Select Priority *"
                        onChange={(e) => setComplaintForm({...complaintForm, priority: e.target.value})}
                          >
                            <MenuItem value="Low">🟢 Low - Can wait</MenuItem>
                            <MenuItem value="Medium">🟡 Medium - Normal priority</MenuItem>
                            <MenuItem value="High">🟠 High - Important</MenuItem>
                            <MenuItem value="Urgent">🔴 Urgent - Immediate attention</MenuItem>
                      </Select>
                    </FormControl>
                        </Box>
                  </Grid>
                  
                      {/* Description Field */}
                  <Grid item xs={12}>
                        <Box sx={{ 
                          mb: 2, 
                          p: 3, 
                          backgroundColor: (theme) => theme.palette.mode === 'dark' 
                            ? 'rgba(45, 45, 45, 0.8)' 
                            : 'white', 
                          borderRadius: '12px',
                          border: (theme) => theme.palette.mode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.1)'
                            : '1px solid rgba(0, 0, 0, 0.05)',
                          boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                            : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: '600', color: '#1976d2', mb: 1 }}>
                            <Description sx={{ mr: 1, verticalAlign: 'middle' }} />
                            Detailed Description
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Provide as much detail as possible to help us understand and resolve your issue
                          </Typography>
                    <TextField
                      fullWidth
                      required
                      label="Detailed Description *"
                      multiline
                      rows={5}
                      value={complaintForm.description}
                      onChange={(e) => {
                        setComplaintForm({...complaintForm, description: e.target.value})
                        validateField('description', e.target.value)
                      }}
                      error={!!formErrors.description}
                      helperText={formErrors.description || (complaintForm.description.trim() ? `${complaintForm.description.trim().length}/10 characters minimum` : 'Minimum 10 characters required')}
                      placeholder="Please describe your issue in detail. Include when it occurred, what you were trying to do, and any error messages you might have seen..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          fontSize: '1.1rem',
                          backgroundColor: (theme) => theme.palette.mode === 'dark' 
                            ? 'rgba(60, 60, 60, 0.8)' 
                            : 'white',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                        </Box>
                  </Grid>
                </Grid>
                
                {/* Submit Button - Inside Form */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  mt: 4,
                  pr: 2
                }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting || !isFormValid()}
                    startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    sx={{
                      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                      borderRadius: '12px',
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      textTransform: 'none',
                      boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        background: 'rgba(0, 0, 0, 0.12)',
                        color: 'rgba(0, 0, 0, 0.26)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {submitting ? 'Submitting Complaint...' : 'Submit Complaint'}
                  </Button>
                </Box>
              </Box>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Analytics Tab */}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Analytics
              </Typography>
              
              {complaints && complaints.length > 0 ? (
                <Grid container spacing={4}>
                  {/* Pie Chart Section */}
                  <Grid item xs={12} lg={8}>
                    <Card sx={{ 
                      borderRadius: '16px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      height: '100%'
                    }}>
                      <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: '#1976d2' }}>
                          <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Complaint Categories Distribution
                        </Typography>
                        
                        <Grid container spacing={4} alignItems="center">
                          {/* Pie Chart */}
                          <Grid item xs={12} md={6}>
                            <Box sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {(() => {
                                const categoryCounts = complaints.reduce((acc, complaint) => {
                                  acc[complaint.category] = (acc[complaint.category] || 0) + 1;
                                  return acc;
                                }, {});
                                
                                const colors = [
                                  '#1976d2', '#f57c00', '#2e7d32', '#d32f2f', 
                                  '#7b1fa2', '#00acc1', '#ff9800', '#795548',
                                  '#607d8b', '#9c27b0', '#ff5722', '#4caf50'
                                ];
                                
                                const data = Object.entries(categoryCounts).map(([category, count], index) => ({
                                  name: category,
                                  value: count,
                                  color: colors[index % colors.length]
                                }));
                                
                                const CustomTooltip = ({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    const data = payload[0];
                                    const total = complaints.length;
                                    const percentage = ((data.value / total) * 100).toFixed(1);
                                    return (
                                      <Box sx={{
                                        backgroundColor: (theme) => theme.palette.mode === 'dark' 
                                  ? 'rgba(60, 60, 60, 0.8)' 
                                  : 'white',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        p: 2,
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                      }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: data.payload.color }}>
                                          {data.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          Count: {data.value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          Percentage: {percentage}%
                                        </Typography>
                                      </Box>
                                    );
                                  }
                                  return null;
                                };
                                
                                if (data.length === 0) {
                                  return (
                                    <Box sx={{ textAlign: 'center', p: 4 }}>
                                      <Typography variant="h6" color="text.secondary">
                                        No data available for chart
                                      </Typography>
                                    </Box>
                                  );
                                }
                                
                                return (
                                  <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                      <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                      >
                                        {data.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                      </Pie>
                                      <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                  </ResponsiveContainer>
                                );
                              })()}
                            </Box>
                          </Grid>
                          
                          {/* Enhanced Legend */}
                          <Grid item xs={12} md={6}>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
                                Category Breakdown
                              </Typography>
                              {(() => {
                                const categoryCounts = complaints.reduce((acc, complaint) => {
                                  acc[complaint.category] = (acc[complaint.category] || 0) + 1;
                                  return acc;
                                }, {});
                                
                                const colors = [
                                  '#1976d2', '#f57c00', '#2e7d32', '#d32f2f', 
                                  '#7b1fa2', '#00acc1', '#ff9800', '#795548',
                                  '#607d8b', '#9c27b0', '#ff5722', '#4caf50'
                                ];
                                
                                return Object.entries(categoryCounts)
                                  .sort(([,a], [,b]) => b - a) // Sort by count descending
                                  .map(([category, count], index) => {
                                    const percentage = ((count / complaints.length) * 100).toFixed(1);
                                    return (
                                      <Box key={category} sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        mb: 2,
                                        p: 2,
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                        border: '1px solid rgba(0, 0, 0, 0.05)',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                          transform: 'translateY(-2px)',
                                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                        }
                                      }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                          <Box sx={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '50%',
                                            backgroundColor: colors[index % colors.length],
                                            mr: 2,
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                                          }} />
                                          <Box>
                                            <Typography variant="body1" sx={{ fontWeight: '600', mb: 0.5 }}>
                                              {category}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                              {count} complaint{count !== 1 ? 's' : ''}
                                            </Typography>
                                          </Box>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors[index % colors.length] }}>
                                            {percentage}%
                                          </Typography>
                                        </Box>
                                      </Box>
                                    );
                                  });
                              })()}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Statistics Summary */}
                  <Grid item xs={12} lg={4}>
                    <Card sx={{ 
                      borderRadius: '16px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      height: '100%'
                    }}>
                      <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: '#1976d2' }}>
                          <BarChart sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Summary Statistics
                        </Typography>
                        
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Box sx={{ 
                              textAlign: 'center', 
                              p: 2, 
                              borderRadius: '12px',
                              backgroundColor: 'rgba(25, 118, 210, 0.05)',
                              border: '1px solid rgba(25, 118, 210, 0.1)'
                            }}>
                              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                {complaints.length}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500' }}>
                                Total Filed
                              </Typography>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Box sx={{ 
                              textAlign: 'center', 
                              p: 2, 
                              borderRadius: '12px',
                              backgroundColor: 'rgba(46, 125, 50, 0.05)',
                              border: '1px solid rgba(46, 125, 50, 0.1)'
                            }}>
                              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                                {complaints.filter(c => c.status.toLowerCase() === 'resolved').length}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500' }}>
                                Resolved
                              </Typography>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Box sx={{ 
                              textAlign: 'center', 
                              p: 2, 
                              borderRadius: '12px',
                              backgroundColor: 'rgba(245, 124, 0, 0.05)',
                              border: '1px solid rgba(245, 124, 0, 0.1)'
                            }}>
                              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#f57c00', mb: 1 }}>
                                {complaints.filter(c => c.status.toLowerCase() === 'pending').length}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500' }}>
                                Pending
                              </Typography>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Box sx={{ 
                              textAlign: 'center', 
                              p: 2, 
                              borderRadius: '12px',
                              backgroundColor: 'rgba(211, 47, 47, 0.05)',
                              border: '1px solid rgba(211, 47, 47, 0.1)'
                            }}>
                              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#d32f2f', mb: 1 }}>
                                {complaints.filter(c => c.status.toLowerCase() === 'rejected').length}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500' }}>
                                Rejected
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        
                        {/* Additional Insights */}
                        <Box sx={{ mt: 4, p: 3, backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: '12px' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
                            Quick Insights
                          </Typography>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Most Common Category:
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                              {(() => {
                                const categoryCounts = complaints.reduce((acc, complaint) => {
                                  acc[complaint.category] = (acc[complaint.category] || 0) + 1;
                                  return acc;
                                }, {});
                                const mostCommon = Object.entries(categoryCounts).reduce((a, b) => a[1] > b[1] ? a : b);
                                return mostCommon[0];
                              })()}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Resolution Rate:
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: '600', color: '#2e7d32' }}>
                              {complaints.length > 0 ? 
                                ((complaints.filter(c => c.status.toLowerCase() === 'resolved').length / complaints.length) * 100).toFixed(1) 
                                : 0}%
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <TrendingUp sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Analytics Available
                </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Submit some complaints to see analytics and insights
                </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    onClick={() => setActiveTab(2)}
                    sx={{
                      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                      borderRadius: '8px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: '600',
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
                      }
                    }}
                  >
                    Submit Your First Complaint
                  </Button>
              </Box>
              )}
            </Box>
          )}
        </Paper>

        {/* Edit Complaint Dialog */}
        <Dialog 
          open={editDialogOpen} 
          onClose={handleEditClose}
          maxWidth="md"
          fullWidth
          scroll="paper"
          sx={{
            zIndex: 9999,
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9998
            },
            '& .MuiPopover-root': {
              zIndex: '10001 !important'
            },
            '& .MuiMenu-paper': {
              zIndex: '10001 !important'
            }
          }}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9999,
              position: 'relative',
              overflow: 'visible'
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 2,
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            flexShrink: 0
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Edit Complaint
            </Typography>
            <IconButton onClick={handleEditClose} size="small">
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ 
            pt: 4,
            pb: 2,
            flex: '1 1 auto',
            overflowY: 'auto',
            overflowX: 'visible',
            minHeight: 0,
            position: 'relative',
            '& .MuiInputLabel-root': {
              position: 'relative',
              transform: 'none',
              marginBottom: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'text.secondary'
            },
            '& .MuiInputLabel-shrink': {
              transform: 'none'
            }
          }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleEditSubmit} sx={{ width: '100%' }}>
              <Grid container spacing={3}>
                {/* Title Field */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: '500', color: 'text.secondary' }}>
                      Complaint Title *
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      label=""
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      placeholder="e.g., Library computer not working, Hostel water issue, etc."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>

                {/* Category and Priority Row */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: '500', color: 'text.secondary' }}>
                      Category *
                    </Typography>
                    <FormControl fullWidth required>
                      <InputLabel sx={{ display: 'none' }}>Category *</InputLabel>
                      <Select
                        value={editForm.category}
                        label=""
                        displayEmpty
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                        MenuProps={{
                          disablePortal: false,
                          disableScrollLock: true,
                          PaperProps: {
                            sx: {
                              maxHeight: 300,
                              zIndex: 10001,
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              borderRadius: '12px',
                              mt: 1,
                              position: 'absolute',
                              overflow: 'visible'
                            }
                          },
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                          style: {
                            zIndex: 10001
                          }
                        }}
                        sx={{
                          borderRadius: '12px',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          }
                        }}
                      >
                        <MenuItem value="Academic">📚 Academic</MenuItem>
                        <MenuItem value="Administration">🏢 Administration</MenuItem>
                        <MenuItem value="Infrastructure">🏗️ Infrastructure</MenuItem>
                        <MenuItem value="Library">📖 Library</MenuItem>
                        <MenuItem value="Hostel">🏠 Hostel</MenuItem>
                        <MenuItem value="Cafeteria">🍽️ Cafeteria</MenuItem>
                        <MenuItem value="Transport">🚌 Transport</MenuItem>
                        <MenuItem value="Faculty">👨‍🏫 Faculty</MenuItem>
                        <MenuItem value="Examination">📝 Examination</MenuItem>
                        <MenuItem value="Fee">💰 Fee</MenuItem>
                        <MenuItem value="Other">📋 Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: '500', color: 'text.secondary' }}>
                      Priority *
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel sx={{ display: 'none' }}>Priority *</InputLabel>
                      <Select
                        value={editForm.priority}
                        label=""
                        displayEmpty
                        onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                        MenuProps={{
                          disablePortal: false,
                          disableScrollLock: true,
                          PaperProps: {
                            sx: {
                              maxHeight: 300,
                              zIndex: 10001,
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              borderRadius: '12px',
                              mt: 1,
                              position: 'absolute',
                              overflow: 'visible'
                            }
                          },
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                          style: {
                            zIndex: 10001
                          }
                        }}
                        sx={{
                          borderRadius: '12px',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          }
                        }}
                      >
                        <MenuItem value="Low">🟢 Low - Can wait</MenuItem>
                        <MenuItem value="Medium">🟡 Medium - Normal priority</MenuItem>
                        <MenuItem value="High">🟠 High - Important</MenuItem>
                        <MenuItem value="Urgent">🔴 Urgent - Immediate attention</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                {/* Description Field */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: '500', color: 'text.secondary' }}>
                      Detailed Description *
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      label=""
                      multiline
                      rows={5}
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      placeholder="Please describe your issue in detail..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ 
            p: 3, 
            pt: 2, 
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            flexShrink: 0
          }}>
            <Button
              onClick={handleEditClose}
              variant="outlined"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: '600',
                px: 3
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              variant="contained"
              disabled={updating}
              startIcon={updating ? <CircularProgress size={20} color="inherit" /> : <Send />}
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: '600',
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
                }
              }}
            >
              {updating ? 'Updating...' : 'Update Complaint'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
