# E-Complain System - Testing Guide

## 🚀 Server Status
- **Backend Server**: Running on http://localhost:4000 ✅
- **Frontend Server**: Starting on http://localhost:3000 ⏳

## 🧪 Testing Checklist

### 1. **Student Registration & Login** ✅
**URL**: http://localhost:3000/student/register

**Test Cases**:
- [ ] **Valid Registration**: 
  - Email: `student@university.edu` (any .edu domain)
  - Roll Number: `1234567890` (10+ digits)
  - All required fields filled
- [ ] **Email Validation**: 
  - ✅ `student@harvard.edu` (should work)
  - ✅ `user@mit.edu` (should work)
  - ❌ `student@gmail.com` (should fail)
  - ❌ `user@university.com` (should fail)
- [ ] **Roll Number Validation**:
  - ✅ `1234567890` (10 digits - should work)
  - ✅ `2024123456789` (13 digits - should work)
  - ❌ `240000` (6 digits - should fail)
  - ❌ `abc123` (contains letters - should fail)

### 2. **Admin Login** ✅
**URL**: http://localhost:3000/admin/login

**Test Cases**:
- [ ] **HOD Login**: 
  - Email: `mechanical.hod@university.edu`
  - Password: `mechanical12345`
  - Role: `hod`
  - Department: `Mechanical`
- [ ] **Assistant HOD Login**:
  - Email: `assistant.hod@university.edu`
  - Password: `assistant12345`
  - Role: `assistant_hod`
  - Department: `Mechanical`

### 3. **HOD Dashboard** ✅
**URL**: http://localhost:3000/admin/dashboard

**Features to Test**:
- [ ] **Tabs Navigation**:
  - Tab 0: "HOD Level Complaints"
  - Tab 1: "Escalated Complaints"
  - Tab 2: "All Department Complaints"
  - Tab 3: "Completed Complaints"
  - Tab 4: "Department Analytics"
- [ ] **Analytics Tab**:
  - Pie Chart: Complaints by Category
  - Bar Chart: Status Distribution
  - Performance Summary with resolution rate
- [ ] **No Rectangle Effects**: Cards should have flat design
- [ ] **Enhanced Tabs**: Should look vibrant, not dull
- [ ] **No Ripple Effects**: Clicking should not show rectangle ripple

### 4. **Assistant HOD Dashboard** ✅
**URL**: http://localhost:3000/admin/assistant-dashboard

**Features to Test**:
- [ ] **Tabs Navigation**:
  - Tab 0: "Assigned Complaints" (with filters)
  - Tab 1: "Completed" (resolved complaints)
  - Tab 2: "Analytics" (charts and statistics)
- [ ] **Filter Buttons** (Tab 0):
  - "All" button should show all assigned complaints
  - "Pending" button should filter pending complaints
  - "In Progress" button should filter in-progress complaints
- [ ] **Analytics Tab**:
  - Pie Chart: Complaints by Category
  - Bar Chart: Status Distribution
  - Performance Summary
- [ ] **Tab Switching**: Each tab should fetch appropriate data
- [ ] **Refresh Button**: Should work contextually for each tab

### 5. **UI/UX Improvements** ✅
- [ ] **No Rectangle Effects**: 
  - Cards should have flat design (no box shadows, border radius)
  - No hover transform effects
- [ ] **Enhanced Tabs**:
  - Should look vibrant and professional
  - Better typography and spacing
- [ ] **No Ripple Effects**:
  - Clicking buttons/cards should not show Material-UI ripple
- [ ] **"Admin Portal" → "Admin"**:
  - Navigation should show "Admin" instead of "Admin Portal"

### 6. **API Endpoints** ✅
**Backend**: http://localhost:4000

- [ ] **GET /api/complaints**: Should return complaints with proper filtering
- [ ] **POST /api/auth/register**: Should validate email (.edu) and roll number (10+ digits)
- [ ] **POST /api/auth/admin/login**: Should authenticate admin users
- [ ] **PUT /api/complaints/:id**: Should update complaint status
- [ ] **POST /api/complaints/:id/comments**: Should add comments

## 🔧 Troubleshooting

### Common Issues:
1. **"Failed to fetch complaints"**: Check if user is properly authenticated
2. **Tabs not working**: Check browser console for JavaScript errors
3. **Validation errors**: Ensure email ends with .edu and roll number has 10+ digits
4. **Server not starting**: Check if ports 3000 and 4000 are available

### Debug Steps:
1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed API calls
4. Verify server logs in terminal

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Student Registration:
- Email validation (.edu): ✅/❌
- Roll number validation (10+ digits): ✅/❌
- Complete registration flow: ✅/❌

Admin Login:
- HOD login: ✅/❌
- Assistant HOD login: ✅/❌

HOD Dashboard:
- All tabs working: ✅/❌
- Analytics charts: ✅/❌
- No rectangle effects: ✅/❌

Assistant HOD Dashboard:
- Tab navigation: ✅/❌
- Filter buttons: ✅/❌
- Analytics: ✅/❌

UI/UX:
- No ripple effects: ✅/❌
- Enhanced tabs: ✅/❌
- "Admin" text: ✅/❌

Issues Found:
- Issue 1: ___________
- Issue 2: ___________
- Issue 3: ___________
```

## 🎯 Success Criteria
- All validation rules working correctly
- Tabs switching properly with correct data
- No UI/UX issues (rectangle effects, ripple effects)
- Analytics charts displaying properly
- Admin login working for both HOD and Assistant HOD
- Student registration accepting .edu emails and 10+ digit roll numbers

