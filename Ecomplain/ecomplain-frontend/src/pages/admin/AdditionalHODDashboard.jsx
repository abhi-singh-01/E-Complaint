import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth/AuthContext.jsx'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext.jsx'
import api from '../../lib/api.js'
import AdminNavbar from '../../components/AdminNavbar.jsx'
import * as XLSX from 'xlsx'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Avatar,
  Divider,
  Paper,
  Badge,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material'
import {
  Assignment,
  TrendingUp,
  CheckCircle,
  Pending,
  Cancel,
  Add,
  Visibility,
  Comment,
  Forward,
  Person,
  Email,
  School,
  CalendarToday,
  Category,
  PriorityHigh,
  Description,
  FilterList,
  MoreVert,
  Refresh,
  Download,
  Delete
} from '@mui/icons-material'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function AdditionalHODDashboard() {
  const { user, setUser } = useAuth()
  const { isDarkMode } = useCustomTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [forwardDialogOpen, setForwardDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [forwardReason, setForwardReason] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [anchorEl, setAnchorEl] = useState(null)

  // Fetch complaints assigned to this additional HOD
  const fetchComplaints = async (statusFilter = 'all') => {
    try {
      setLoading(true)
      setError('') // Clear any previous errors
      
      const userId = user._id || user.id
      
      const { data } = await api.get('/api/complaints', {
        params: {
          department: user.department,
          assignedTo: userId,
          status: statusFilter === 'all' ? undefined : 
            statusFilter === 'pending' ? 'Pending' :
            statusFilter === 'in progress' ? 'In Progress' :
            statusFilter === 'resolved' ? 'Resolved' :
            statusFilter === 'rejected' ? 'Rejected' :
            statusFilter === 'closed' ? 'Closed' : statusFilter,
          limit: 100 // Increase limit to get more complaints
        }
      })
      
      setComplaints(data.complaints || [])
    } catch (err) {
      if (err.__CACHED__) {
        setComplaints(err.data?.complaints || [])
        return
      }
      console.error('Error fetching complaints:', err)
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please login again.')
      } else if (err.response?.status === 403) {
        setError('Access denied. You do not have permission to view these complaints.')
      } else if (err.response?.status === 404) {
        setError('No complaints found assigned to you.')
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError(`Failed to fetch complaints: ${err.response?.data?.message || err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  // Fetch all complaints for analytics and completed tabs
  const fetchAllComplaints = async () => {
    try {
      setLoading(true)
      setError('')
      
      const userId = user._id || user.id
      
      const { data } = await api.get('/api/complaints', {
        params: {
          department: user.department,
          assignedTo: userId,
          limit: 100
        }
      })
      
      setComplaints(data.complaints || [])
    } catch (err) {
      console.error('Error fetching all complaints:', err)
      setError(`Failed to fetch complaints: ${err.response?.data?.message || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    
    if (newValue === 0) {
      // Assigned Complaints tab - fetch with current filter
      fetchComplaints(filterStatus)
    } else if (newValue === 1) {
      // Completed tab - fetch all complaints to show resolved ones
      fetchAllComplaints()
    } else if (newValue === 2) {
      // Analytics tab - fetch all complaints for statistics
      fetchAllComplaints()
    }
  }

  useEffect(() => {
    if (user && (user._id || user.id)) {
      // Only fetch on initial load or when filter changes in tab 0
      if (activeTab === 0) {
        fetchComplaints(filterStatus)
      }
    } else {
      setError('User information not available. Please login again.')
      
      // Try to fetch user profile from backend
      const fetchUserProfile = async () => {
        try {
          const { data } = await api.get('/api/auth/me')
          if (data.success && data.user) {
            setUser(data.user)
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err)
        }
      }
      
      fetchUserProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, user?.id, filterStatus, activeTab])

  // Handle complaint status update
  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
      await api.put(`/api/complaints/${complaintId}`, {
        status: newStatus
      })
      // Refresh the appropriate data based on current tab
      if (activeTab === 0) {
        fetchComplaints(filterStatus)
      } else {
        fetchAllComplaints()
      }
    } catch (err) {
      console.error('Status update error:', err)
      setError('Failed to update complaint status: ' + (err.response?.data?.message || err.message))
    }
  }

  // Handle adding comment
  const handleAddComment = async () => {
    if (!comment.trim()) return

    try {
      await api.post(`/api/complaints/${selectedComplaint._id}/comments`, {
        comment: comment.trim(),
        isInternal: true // Additional HOD comments are internal
      })
      setComment('')
      setCommentDialogOpen(false)
      fetchComplaints()
    } catch (err) {
      console.error('Comment error:', err)
      setError('Failed to add comment: ' + (err.response?.data?.message || err.message))
    }
  }

  // Handle forwarding to Dean
  const handleForward = async () => {
    if (!forwardReason.trim()) return

    try {
      const userId = user._id || user.id
      
      const response = await api.put(`/api/complaints/${selectedComplaint._id}`, {
        workflow: {
          currentLevel: 'dean',
          escalatedAt: new Date().toISOString(),
          escalatedBy: userId,
          escalationReason: forwardReason.trim()
        }
      })
      
      setForwardReason('')
      setForwardDialogOpen(false)
      fetchComplaints()
    } catch (err) {
      console.error('Forward error:', err)
      setError('Failed to forward complaint: ' + (err.response?.data?.message || err.message))
    }
  }

  // Handle deleting complaint
  const handleDelete = async () => {
    if (!selectedComplaint) return

    try {
      await api.delete(`/api/complaints/${selectedComplaint._id}`)
      setDeleteDialogOpen(false)
      setSelectedComplaint(null)
      if (activeTab === 0) {
        fetchComplaints(filterStatus)
      } else {
        fetchAllComplaints()
      }
      setError('')
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete complaint: ' + (err.response?.data?.message || err.message))
      setDeleteDialogOpen(false)
    }
  }

  // Handle Excel export
  const handleExportToExcel = () => {
    try {
      // Create workbook
      const workbook = XLSX.utils.book_new()

      // Summary data
      const summaryData = [
        ['Additional HOD Summary Report'],
        ['Generated on:', new Date().toLocaleDateString()],
        ['Department:', user?.department || 'N/A'],
        ['Additional HOD:', `${user?.firstName} ${user?.lastName}`],
        [''],
        ['Statistics'],
        ['Total Assigned Complaints', stats.total],
        ['Pending', stats.pending],
        ['In Progress', stats.inProgress],
        ['Resolved', stats.resolved],
        ['Rejected', stats.rejected],
        ['Resolution Rate', `${stats.total > 0 ? ((stats.resolved / stats.total) * 100).toFixed(1) : 0}%`],
        [''],
        ['Category Distribution'],
        ...chartData.map(item => [item.name, item.value])
      ]

      // Create summary worksheet
      const summaryWS = XLSX.utils.aoa_to_sheet(summaryData)
      XLSX.utils.book_append_sheet(workbook, summaryWS, 'Summary')

      // All complaints data
      if (complaints.length > 0) {
        const complaintsData = complaints.map(complaint => ({
          'Complaint ID': complaint._id,
          'Title': complaint.title,
          'Description': complaint.description,
          'Category': complaint.category,
          'Priority': complaint.priority,
          'Status': complaint.status,
          'Student Name': complaint.student ? `${complaint.student.firstName} ${complaint.student.lastName}` : 'N/A',
          'Student Email': complaint.student?.email || 'N/A',
          'Student Roll No': complaint.student?.rollNo || 'N/A',
          'Created Date': new Date(complaint.createdAt).toLocaleDateString(),
          'Updated Date': new Date(complaint.updatedAt).toLocaleDateString(),
          'Workflow Level': complaint.workflow?.currentLevel || 'N/A',
          'Forwarded': complaint.workflow?.escalatedAt ? 'Yes' : 'No',
          'Forward Reason': complaint.workflow?.escalationReason || 'N/A'
        }))

        const complaintsWS = XLSX.utils.json_to_sheet(complaintsData)
        XLSX.utils.book_append_sheet(workbook, complaintsWS, 'Assigned Complaints')
      }

      // Generate filename
      const filename = `AdditionalHOD_Report_${user?.department}_${new Date().toISOString().split('T')[0]}.xlsx`

      // Save file
      XLSX.writeFile(workbook, filename)

      // Show success message
      setError('')
      // You could add a success state here if needed
    } catch (err) {
      setError('Failed to export data to Excel')
      console.error('Export error:', err)
    }
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning'
      case 'in progress': return 'info'
      case 'resolved': return 'success'
      case 'rejected': return 'error'
      default: return 'default'
    }
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'error'
      case 'high': return 'warning'
      case 'medium': return 'info'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  // Calculate statistics
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status.toLowerCase() === 'pending').length,
    inProgress: complaints.filter(c => c.status.toLowerCase() === 'in progress').length,
    resolved: complaints.filter(c => c.status.toLowerCase() === 'resolved').length,
    rejected: complaints.filter(c => c.status.toLowerCase() === 'rejected').length
  }

  // Prepare chart data
  const categoryData = complaints.reduce((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(categoryData).map(([category, count]) => ({
    name: category,
    value: count
  }))

  const colors = ['#1976d2', '#f57c00', '#2e7d32', '#d32f2f', '#7b1fa2', '#00acc1']

  return (
    <>
      <AdminNavbar />
      <Container maxWidth="xl" sx={{ py: 2, pt: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '2.5rem' }}>
            Additional HOD Dashboard
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
            {user?.department || 'Unknown'} Department - Welcome, {user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User'}
          </Typography>
        </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4} sx={{ display: 'flex', minHeight: 0 }}>
          <Card sx={{ 
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            width: '100%',
            minHeight: '200px',
            aspectRatio: '1',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexGrow: 1,
              height: '100%'
            }}>
              <Assignment sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '2rem' }}>
                {stats.total}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: '600' }}>
                Total Assigned
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4} sx={{ display: 'flex', minHeight: 0 }}>
          <Card sx={{ 
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            width: '100%',
            minHeight: '200px',
            aspectRatio: '1',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexGrow: 1,
              height: '100%'
            }}>
              <Pending sx={{ fontSize: 40, color: '#f57c00', mb: 1 }} />
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#f57c00', fontSize: '2rem' }}>
                {stats.pending}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: '600' }}>
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4} sx={{ display: 'flex', minHeight: 0 }}>
          <Card sx={{ 
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            width: '100%',
            minHeight: '200px',
            aspectRatio: '1',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexGrow: 1,
              height: '100%'
            }}>
              <TrendingUp sx={{ fontSize: 40, color: '#00acc1', mb: 1 }} />
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#00acc1', fontSize: '2rem' }}>
                {stats.inProgress}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: '600' }}>
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4} sx={{ display: 'flex', minHeight: 0 }}>
          <Card sx={{ 
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            width: '100%',
            minHeight: '200px',
            aspectRatio: '1',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexGrow: 1,
              height: '100%'
            }}>
              <CheckCircle sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '2rem' }}>
                {stats.resolved}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: '600' }}>
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4} sx={{ display: 'flex', minHeight: 0 }}>
          <Card sx={{ 
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            width: '100%',
            minHeight: '200px',
            aspectRatio: '1',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexGrow: 1,
              height: '100%'
            }}>
              <Cancel sx={{ fontSize: 40, color: '#d32f2f', mb: 1 }} />
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#d32f2f', fontSize: '2rem' }}>
                {stats.rejected}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: '600' }}>
                Rejected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              minHeight: 48
            }
          }}
        >
          <Tab label="Assigned Complaints" />
          <Tab label="Completed" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Filter and Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant={filterStatus === 'all' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => {
                  setFilterStatus('all')
                  fetchComplaints('all')
                }}
              >
                All ({stats.total})
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'contained' : 'outlined'}
                size="small"
                color="warning"
                onClick={() => {
                  setFilterStatus('pending')
                  fetchComplaints('pending')
                }}
              >
                Pending ({stats.pending})
              </Button>
              <Button
                variant={filterStatus === 'in progress' ? 'contained' : 'outlined'}
                size="small"
                color="info"
                onClick={() => {
                  setFilterStatus('in progress')
                  fetchComplaints('in progress')
                }}
              >
                In Progress ({stats.inProgress})
              </Button>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                if (activeTab === 0) {
                  fetchComplaints(filterStatus)
                } else {
                  fetchAllComplaints()
                }
              }}
            >
              Refresh
            </Button>
          </Box>

          {/* Complaints List */}
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent sx={{ p: 0 }}>
              {loading ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography>Loading complaints...</Typography>
                </Box>
              ) : complaints.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No complaints assigned
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You don't have any complaints assigned to you at the moment.
                  </Typography>
                </Box>
              ) : (
                <List>
                  {complaints.map((complaint, index) => (
                    <React.Fragment key={complaint._id}>
                      <ListItem sx={{ py: 3, px: 3 }}>
                        <ListItemIcon sx={{ minWidth: 48 }}>
                          <Avatar sx={{ bgcolor: getStatusColor(complaint.status) + '.light' }}>
                            <Assignment />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                                {complaint.title}
                              </Typography>
                              <Chip
                                label={complaint.status}
                                color={getStatusColor(complaint.status)}
                                size="small"
                                sx={{ fontSize: '0.8rem', fontWeight: '600' }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', fontSize: '1rem', lineHeight: 1.6 }}>
                                {complaint.description}
                              </Typography>
                              
                              {/* Student Information */}
                              <Box sx={{ mb: 2, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: '8px' }}>
                                <Typography variant="body2" sx={{ fontWeight: '600', mb: 1, color: '#1976d2' }}>
                                  Student Information:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Person sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                      {complaint.student ? `${complaint.student.firstName} ${complaint.student.lastName}` : 'N/A'}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Email sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                      {complaint.student?.email || 'N/A'}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <School sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                      {complaint.student?.rollNo || 'N/A'}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>

                              {/* Complaint Details */}
                              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Category sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                  <Chip
                                    label={complaint.category}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.8rem' }}
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <PriorityHigh sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                  <Chip
                                    label={complaint.priority}
                                    color={getPriorityColor(complaint.priority)}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.8rem' }}
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <CalendarToday sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                    Created: {new Date(complaint.createdAt).toLocaleDateString()}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <CalendarToday sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                    Updated: {new Date(complaint.updatedAt).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>

                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="View Details">
                              <IconButton
                                onClick={() => {
                                  setSelectedComplaint(complaint)
                                  setViewDialogOpen(true)
                                }}
                              >
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Add Comment">
                              <IconButton
                                onClick={() => {
                                  setSelectedComplaint(complaint)
                                  setCommentDialogOpen(true)
                                }}
                              >
                                <Comment />
                              </IconButton>
                            </Tooltip>
                            {complaint.workflow?.currentLevel !== 'dean' && (
                              <>
                                <Tooltip title="Forward to Dean">
                                  <IconButton
                                    onClick={() => {
                                      setSelectedComplaint(complaint)
                                      setForwardDialogOpen(true)
                                    }}
                                    disabled={
                                      complaint.status.toLowerCase() === 'resolved' ||
                                      complaint.status.toLowerCase() === 'rejected'
                                    }
                                  >
                                    <Forward />
                                  </IconButton>
                                </Tooltip>
                                <IconButton
                                  onClick={(e) => {
                                    setAnchorEl(e.currentTarget)
                                    setSelectedComplaint(complaint)
                                  }}
                                >
                                  <MoreVert />
                                </IconButton>
                              </>
                            )}
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < complaints.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Completed Tab */}
      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3, fontSize: '1.8rem' }}>
            Completed Complaints
          </Typography>
          
          {complaints && complaints.filter(c => c.status.toLowerCase() === 'resolved').length > 0 ? (
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent sx={{ p: 0 }}>
                <List>
                  {complaints
                    .filter(c => c.status.toLowerCase() === 'resolved')
                    .map((complaint, index) => (
                      <React.Fragment key={complaint._id}>
                        <ListItem sx={{ py: 3, px: 3 }}>
                          <ListItemIcon sx={{ minWidth: 48 }}>
                            <Avatar sx={{ bgcolor: 'success.light' }}>
                              <CheckCircle sx={{ color: '#2e7d32' }} />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                                  {complaint.title}
                                </Typography>
                                <Chip
                                  label="Resolved"
                                  color="success"
                                  size="small"
                                  sx={{ fontSize: '0.8rem', fontWeight: '600' }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', fontSize: '1rem', lineHeight: 1.6 }}>
                                  {complaint.description}
                                </Typography>
                                
                                {/* Student Information */}
                                <Box sx={{ mb: 2, p: 2, backgroundColor: 'rgba(46, 125, 50, 0.05)', borderRadius: '8px', border: '1px solid rgba(46, 125, 50, 0.1)' }}>
                                  <Typography variant="body2" sx={{ fontWeight: '600', mb: 1, color: '#2e7d32' }}>
                                    Student Information:
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Person sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                        {complaint.student ? `${complaint.student.firstName} ${complaint.student.lastName}` : 'N/A'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Email sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                        {complaint.student?.email || 'N/A'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <School sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                        {complaint.student?.rollNo || 'N/A'}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>

                                {/* Complaint Details */}
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Category sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                    <Chip
                                      label={complaint.category}
                                      size="small"
                                      variant="outlined"
                                      sx={{ fontSize: '0.8rem' }}
                                    />
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PriorityHigh sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                    <Chip
                                      label={complaint.priority}
                                      color={getPriorityColor(complaint.priority)}
                                      size="small"
                                      variant="outlined"
                                      sx={{ fontSize: '0.8rem' }}
                                    />
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CalendarToday sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                      Created: {new Date(complaint.createdAt).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircle sx={{ fontSize: '1rem', color: '#2e7d32' }} />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem', color: '#2e7d32', fontWeight: '600' }}>
                                      Resolved: {new Date(complaint.updatedAt).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                </Box>

                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="View Details">
                                <IconButton
                                  onClick={() => {
                                    setSelectedComplaint(complaint)
                                    setViewDialogOpen(true)
                                  }}
                                  sx={{ color: '#1976d2' }}
                                >
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < complaints.filter(c => c.status.toLowerCase() === 'resolved').length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                </List>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircle sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
              <Typography variant="h4" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                No completed complaints yet
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontSize: '1.2rem' }}>
                Resolved complaints will appear here
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
              Additional HOD Analytics
          </Typography>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleExportToExcel}
              sx={{ fontWeight: 'bold' }}
            >
              Export Report
            </Button>
          </Box>
          
          <Grid container spacing={4}>
            {/* Complaints by Category Pie Chart */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ 
                height: '550px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    color: isDarkMode ? '#ffffff' : '#1976d2',
                    fontSize: '1.5rem',
                    mb: 1
                  }}>
                    Complaints by Category
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '1rem' }}>
                    Distribution of complaints by category assigned to you
                  </Typography>
                  {chartData.length > 0 ? (
                    <Box sx={{ height: 380, mt: 2, flex: 1, overflow: 'hidden' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                            labelStyle={{
                              fill: isDarkMode ? '#ffffff' : '#000000',
                              fontSize: '11px',
                              fontWeight: '500',
                              textAnchor: 'middle'
                            }}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            formatter={(value, name) => [value, 'Complaints']}
                            labelFormatter={(label) => `Category: ${label}`}
                            contentStyle={{
                              backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                              border: isDarkMode ? '1px solid #333' : '1px solid #ccc',
                              color: isDarkMode ? '#ffffff' : '#000000',
                            }}
                            cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                          />
                          <Legend 
                            wrapperStyle={{
                              color: isDarkMode ? '#ffffff' : '#000000',
                              fontSize: '11px',
                              fontWeight: '500',
                              paddingTop: '5px',
                              paddingBottom: '5px'
                            }}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 8, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h6" color="text.secondary">No data available</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Status Distribution */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ 
                height: '550px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    color: isDarkMode ? '#ffffff' : '#1976d2',
                    fontSize: '1.5rem',
                    mb: 1
                  }}>
                    Status Distribution
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '1rem' }}>
                    Current status breakdown of your assigned complaints
                  </Typography>
                  <Box sx={{ height: 380, mt: 2, flex: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Pending', value: stats.pending, color: '#f57c00' },
                        { name: 'In Progress', value: stats.inProgress, color: '#1976d2' },
                        { name: 'Resolved', value: stats.resolved, color: '#2e7d32' },
                        { name: 'Rejected', value: stats.rejected, color: '#d32f2f' }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e0e0e0'} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ 
                            fill: isDarkMode ? '#ffffff' : '#000000',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                          axisLine={{ stroke: isDarkMode ? '#333' : '#e0e0e0' }}
                          tickLine={{ stroke: isDarkMode ? '#333' : '#e0e0e0' }}
                        />
                        <YAxis 
                          tick={{ 
                            fill: isDarkMode ? '#ffffff' : '#000000',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                          axisLine={{ stroke: isDarkMode ? '#333' : '#e0e0e0' }}
                          tickLine={{ stroke: isDarkMode ? '#333' : '#e0e0e0' }}
                        />
                        <RechartsTooltip 
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                            border: isDarkMode ? '1px solid #333' : '1px solid #ccc',
                            borderRadius: '8px',
                            color: isDarkMode ? '#ffffff' : '#000000',
                            boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }}
                          cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {[
                            { name: 'Pending', value: stats.pending, color: '#f57c00' },
                            { name: 'In Progress', value: stats.inProgress, color: '#1976d2' },
                            { name: 'Resolved', value: stats.resolved, color: '#2e7d32' },
                            { name: 'Rejected', value: stats.rejected, color: '#d32f2f' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Additional HOD Performance Summary */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ 
                height: '550px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    color: isDarkMode ? '#ffffff' : '#1976d2',
                    fontSize: '1.5rem',
                    mb: 1
                  }}>
                    Performance Summary
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '1rem' }}>
                    Key performance metrics and resolution statistics
                  </Typography>
                  <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    mt: 2 
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 4,
                      p: 3,
                      backgroundColor: isDarkMode ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)',
                    }}>
                      <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ 
                          fontWeight: 'bold', 
                          color: isDarkMode ? '#ffffff' : '#1976d2',
                          mb: 1
                        }}>
                          {stats.total > 0 ? ((stats.resolved / stats.total) * 100).toFixed(1) : 0}%
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                          Resolution Rate
                        </Typography>
                  </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ flex: 1, textAlign: 'center', p: 2, backgroundColor: isDarkMode ? 'rgba(46, 125, 50, 0.1)' : 'rgba(46, 125, 50, 0.05)' }}>
                        <Typography variant="h4" sx={{ 
                        fontWeight: 'bold',
                          color: isDarkMode ? '#2e7d32' : '#2e7d32' 
                        }}>
                          {stats.resolved}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                          Resolved
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: 'center', p: 2, backgroundColor: isDarkMode ? 'rgba(245, 124, 0, 0.1)' : 'rgba(245, 124, 0, 0.05)' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 'bold', 
                          color: isDarkMode ? '#f57c00' : '#f57c00' 
                        }}>
                          {stats.pending}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                          Pending
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: 'center', p: 2, backgroundColor: isDarkMode ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)' }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 'bold', 
                          color: isDarkMode ? '#1976d2' : '#1976d2' 
                        }}>
                          {stats.inProgress}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                          In Progress
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* View Complaint Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Complaint Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedComplaint && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                {selectedComplaint.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedComplaint.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status:</Typography>
                  <Chip label={selectedComplaint.status} color={getStatusColor(selectedComplaint.status)} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Priority:</Typography>
                  <Chip label={selectedComplaint.priority} color={getPriorityColor(selectedComplaint.priority)} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Category:</Typography>
                  <Typography variant="body1">{selectedComplaint.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Created:</Typography>
                  <Typography variant="body1">
                    {new Date(selectedComplaint.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Comment Dialog */}
      <Dialog open={commentDialogOpen} onClose={() => setCommentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comment here..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddComment} variant="contained">Add Comment</Button>
        </DialogActions>
      </Dialog>

      {/* Forward Dialog */}
      <Dialog open={forwardDialogOpen} onClose={() => setForwardDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Forward to Dean</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please provide a reason for forwarding this complaint to the Dean:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={forwardReason}
            onChange={(e) => setForwardReason(e.target.value)}
            placeholder="Explain why this complaint needs Dean attention..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForwardDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleForward} variant="contained" color="warning">
            Forward to Dean
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Update Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          handleStatusUpdate(selectedComplaint?._id, 'In Progress')
          setAnchorEl(null)
        }}>
          Mark as In Progress
        </MenuItem>
        <MenuItem onClick={() => {
          handleStatusUpdate(selectedComplaint?._id, 'Resolved')
          setAnchorEl(null)
        }}>
          Mark as Resolved
        </MenuItem>
        <MenuItem onClick={() => {
          handleStatusUpdate(selectedComplaint?._id, 'Rejected')
          setAnchorEl(null)
        }}>
          Mark as Rejected
        </MenuItem>
        <MenuItem 
          onClick={() => {
            setDeleteDialogOpen(true)
            setAnchorEl(null)
          }}
          sx={{ color: 'error.main' }}
        >
          Delete Complaint
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Complaint</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this complaint? This action cannot be undone.
          </Typography>
          {selectedComplaint && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {selectedComplaint.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ID: {selectedComplaint._id}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </>
  )
}
