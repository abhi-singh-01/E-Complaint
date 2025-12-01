const express = require('express');
const router = express.Router();
const {
  getComplaints,
  getComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  addComment,
  assignComplaint,
  getComplaintStats,
  escalateComplaint,
  assignToAdditionalHOD,
  forwardComplaint,
  forwardToExternal,
  acknowledgeExternal,
  closeExternalComplaint
} = require('../controllers/complaintController');
const {
  validateComplaintCreation,
  validateComplaintUpdate,
  validateComment,
  validateQueryParams,
  validateObjectId
} = require('../middleware/validation');
const {
  authenticateToken,
  requireStudent,
  requireAdmin,
  requirePermission
} = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Public complaint routes (for students)
router.route('/')
  .get(validateQueryParams, getComplaints)
  .post(requireStudent, validateComplaintCreation, createComplaint);

// Admin-only routes
router.get('/stats', requireAdmin, requirePermission('canViewReports'), getComplaintStats);

// Individual complaint routes
router.route('/:id')
  .get(validateObjectId('id'), getComplaint)
  .put(validateObjectId('id'), validateComplaintUpdate, updateComplaint)
  .delete(validateObjectId('id'), deleteComplaint);

// Comment routes
router.post('/:id/comments', 
  validateObjectId('id'), 
  validateComment, 
  addComment
);

// Assignment routes (Admin only)
router.put('/:id/assign', 
  requireAdmin, 
  requirePermission('canManageComplaints'),
  validateObjectId('id'),
  assignComplaint
);

// Escalation route (Additional HOD only)
router.put('/:id/escalate',
  requireAdmin,
  requirePermission('canManageComplaints'),
  validateObjectId('id'),
  escalateComplaint
);

// Forward route (Coordinator only)
router.put('/:id/forward',
  requireAdmin,
  requirePermission('canManageComplaints'),
  validateObjectId('id'),
  forwardComplaint
);

// Forward to external department route (Dean only)
router.put('/:id/forward-external',
  requireAdmin,
  requirePermission('canManageComplaints'),
  validateObjectId('id'),
  forwardToExternal
);

// Acknowledge external complaint route (External departments)
router.put('/:id/acknowledge-external',
  requireAdmin,
  validateObjectId('id'),
  acknowledgeExternal
);

// Close external complaint route (Dean only)
router.put('/:id/close-external',
  requireAdmin,
  requirePermission('canManageComplaints'),
  validateObjectId('id'),
  closeExternalComplaint
);

// Assign to Additional HOD route (Dean only)
router.put('/:id/assign-additional',
  requireAdmin,
  requirePermission('canManageComplaints'),
  validateObjectId('id'),
  assignToAdditionalHOD
);

module.exports = router;
