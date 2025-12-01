import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../../auth/AuthContext.jsx'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext.jsx'
import api from '../../lib/api.js'
import AdminNavbar from '../../components/AdminNavbar.jsx'
import axios from 'axios'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
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
  Tooltip,
  CircularProgress,
  Grid
} from '@mui/material'
import {
  Assignment,
  CheckCircle,
  Visibility,
  Done,
  Refresh,
  School,
  CalendarToday,
  Category,
  PriorityHigh,
  Person
} from '@mui/icons-material'

export default function ExternalDepartmentDashboard() {
  const { user } = useAuth()
  const { isDarkMode } = useCustomTheme()
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [acknowledgeDialogOpen, setAcknowledgeDialogOpen] = useState(false)
  const [acknowledgementComment, setAcknowledgementComment] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Request cancellation ref
  const cancelTokenRef = useRef(null)

  // Get department name based on role and department field
  const getDepartmentName = () => {
    // For external role, use the department field
    if (user.role === 'external' && user.department) {
      return user.department.charAt(0).toUpperCase() + user.department.slice(1)
    }
    // Default fallback
    return 'Accounts'
  }

  const departmentName = getDepartmentName()

  // Fetch complaints forwarded to this external department
  const fetchComplaints = useCallback(async () => {
    // Cancel previous request if exists
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('New request initiated')
    }
    
    cancelTokenRef.current = axios.CancelToken.source()
    
    try {
      setLoading(true)
      setError('')
      
      const { data } = await api.get('/api/complaints', {
        params: {
          limit: 1000 // Get all complaints to filter by externalForward
        },
        cancelToken: cancelTokenRef.current.token
      })
      
      // Filter complaints forwarded to this department
      const allComplaints = data.complaints || []
      const forwardedComplaints = allComplaints.filter(complaint => 
        complaint.externalForward?.isForwarded && 
        complaint.externalForward?.forwardedTo === departmentName
      )
      
      // Apply status filter
      const filtered = filterStatus === 'all' 
        ? forwardedComplaints
        : forwardedComplaints.filter(c => 
            c.status.toLowerCase() === filterStatus.toLowerCase()
          )
      
      setComplaints(filtered)
    } catch (err) {
      if (axios.isCancel(err)) {
        return // Ignore cancelled requests
      }
      if (err.__CACHED__) {
        const allComplaints = err.data?.complaints || []
        const forwardedComplaints = allComplaints.filter(complaint => 
          complaint.externalForward?.isForwarded && 
          complaint.externalForward?.forwardedTo === departmentName
        )
        const filtered = filterStatus === 'all' 
          ? forwardedComplaints
          : forwardedComplaints.filter(c => 
              c.status.toLowerCase() === filterStatus.toLowerCase()
            )
        setComplaints(filtered)
        setLoading(false)
        return
      }
      setError('Failed to fetch complaints')
      console.error('Error fetching complaints:', err)
    } finally {
      setLoading(false)
    }
  }, [departmentName, filterStatus])

  useEffect(() => {
    if (user) {
      fetchComplaints()
    }
    
    // Cleanup: cancel pending requests on unmount
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('Component unmounted')
      }
    }
  }, [user, fetchComplaints])

  // Handle acknowledging complaint
  const handleAcknowledge = async () => {
    if (!selectedComplaint) return

    try {
      await api.put(`/api/complaints/${selectedComplaint._id}/acknowledge-external`, {
        acknowledgementComment: acknowledgementComment.trim() || undefined
      })
      setAcknowledgeDialogOpen(false)
      setSelectedComplaint(null)
      setAcknowledgementComment('')
      fetchComplaints()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to acknowledge complaint')
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'in progress':
        return 'info'
      case 'resolved':
        return 'success'
      case 'rejected':
        return 'error'
      case 'closed':
        return 'default'
      default:
        return 'default'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'error'
      case 'high':
        return 'warning'
      case 'medium':
        return 'info'
      case 'low':
        return 'default'
      default:
        return 'default'
    }
  }

  // Get statistics
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status.toLowerCase() === 'pending').length,
    inProgress: complaints.filter(c => c.status.toLowerCase() === 'in progress').length,
    acknowledged: complaints.filter(c => c.externalForward?.acknowledged).length,
    notAcknowledged: complaints.filter(c => !c.externalForward?.acknowledged).length
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }}>
      <AdminNavbar />
      <Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {departmentName} Department Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and acknowledge complaints forwarded to {departmentName} Department
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Complaints
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  {stats.notAcknowledged}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Acknowledgement
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {stats.acknowledged}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Acknowledged
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                  {stats.inProgress}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filter and Refresh */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant={filterStatus === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilterStatus('all')}
              size="small"
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'contained' : 'outlined'}
              onClick={() => setFilterStatus('pending')}
              size="small"
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'in progress' ? 'contained' : 'outlined'}
              onClick={() => setFilterStatus('in progress')}
              size="small"
            >
              In Progress
            </Button>
            <Button
              variant={filterStatus === 'resolved' ? 'contained' : 'outlined'}
              onClick={() => setFilterStatus('resolved')}
              size="small"
            >
              Resolved
            </Button>
          </Box>
          <IconButton onClick={fetchComplaints} disabled={loading}>
            <Refresh />
          </IconButton>
        </Box>

        {/* Complaints List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : complaints.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No complaints found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filterStatus === 'all' 
                  ? 'No complaints have been forwarded to your department yet.'
                  : `No ${filterStatus} complaints found.`}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent sx={{ p: 0 }}>
              <List>
                {complaints.map((complaint, index) => (
                  <React.Fragment key={complaint._id}>
                    <ListItem sx={{ py: 3, px: 3 }}>
                      <ListItemIcon sx={{ minWidth: 48 }}>
                        <Avatar sx={{ bgcolor: complaint.externalForward?.acknowledged ? 'success.light' : 'warning.light' }}>
                          {complaint.externalForward?.acknowledged ? <CheckCircle /> : <Assignment />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {complaint.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                              {complaint.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                              <Chip
                                label={complaint.status}
                                color={getStatusColor(complaint.status)}
                                size="small"
                              />
                              <Chip
                                label={complaint.priority}
                                color={getPriorityColor(complaint.priority)}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                label={complaint.category}
                                size="small"
                                variant="outlined"
                              />
                              {complaint.externalForward?.acknowledged && (
                                <Chip
                                  icon={<CheckCircle />}
                                  label="Acknowledged"
                                  color="success"
                                  size="small"
                                />
                              )}
                              <Typography variant="caption" color="text.secondary">
                                Forwarded: {new Date(complaint.externalForward?.forwardedAt).toLocaleDateString()}
                              </Typography>
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
                          {!complaint.externalForward?.acknowledged && (
                            <Tooltip title="Acknowledge Complaint">
                              <IconButton
                                onClick={() => {
                                  setSelectedComplaint(complaint)
                                  setAcknowledgeDialogOpen(true)
                                }}
                                sx={{ color: 'success.main' }}
                              >
                                <Done />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < complaints.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {/* View Complaint Dialog */}
        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Complaint Details</DialogTitle>
          <DialogContent>
            {selectedComplaint && (
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {selectedComplaint.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Description:</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedComplaint.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Status:</Typography>
                    <Chip label={selectedComplaint.status} color={getStatusColor(selectedComplaint.status)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Priority:</Typography>
                    <Chip label={selectedComplaint.priority} color={getPriorityColor(selectedComplaint.priority)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Category:</Typography>
                    <Chip label={selectedComplaint.category} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Department:</Typography>
                    <Chip label={selectedComplaint.department} />
                  </Grid>
                  {selectedComplaint.externalForward?.isForwarded && (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">Forwarded To:</Typography>
                        <Chip label={selectedComplaint.externalForward.forwardedTo} color="info" sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                          Forwarded on: {new Date(selectedComplaint.externalForward.forwardedAt).toLocaleString()}
                        </Typography>
                        {selectedComplaint.externalForward.forwardReason && (
                          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'info.main' }}>
                            Reason: {selectedComplaint.externalForward.forwardReason}
                          </Typography>
                        )}
                      </Grid>
                      {selectedComplaint.externalForward?.acknowledged && (
                        <Grid item xs={12}>
                          <Chip 
                            icon={<CheckCircle />}
                            label={`Acknowledged by ${selectedComplaint.externalForward.forwardedTo}`}
                            color="success"
                            sx={{ mb: 1 }}
                          />
                          {selectedComplaint.externalForward.acknowledgementComment && (
                            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'success.main' }}>
                              Acknowledgement: {selectedComplaint.externalForward.acknowledgementComment}
                            </Typography>
                          )}
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                            Acknowledged on: {new Date(selectedComplaint.externalForward.acknowledgedAt).toLocaleString()}
                          </Typography>
                        </Grid>
                      )}
                    </>
                  )}
                  {selectedComplaint.student && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Student:</Typography>
                      <Typography variant="body1">
                        {selectedComplaint.student.firstName} {selectedComplaint.student.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedComplaint.student.email}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Acknowledge Complaint Dialog */}
        <Dialog open={acknowledgeDialogOpen} onClose={() => setAcknowledgeDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Acknowledge Complaint</DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              By acknowledging this complaint, you confirm that {departmentName} Department has received and will handle this complaint.
            </Alert>
            {selectedComplaint && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Complaint:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {selectedComplaint.title}
                </Typography>
              </Box>
            )}
            <TextField
              fullWidth
              multiline
              rows={4}
              value={acknowledgementComment}
              onChange={(e) => setAcknowledgementComment(e.target.value)}
              placeholder="Optional: Add an acknowledgement comment..."
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setAcknowledgeDialogOpen(false)
              setAcknowledgementComment('')
            }}>Cancel</Button>
            <Button onClick={handleAcknowledge} variant="contained" color="success">
              Acknowledge Complaint
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

