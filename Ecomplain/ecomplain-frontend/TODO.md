# TODO: Fix External Department Role and Department Validation

## Overview
Update frontend to send role: 'external' and department as lowercase ('accounts', 'librarian', 'maintenance') for external departments to match backend expectations.

## Tasks
- [x] Update AdminLogin.jsx: Modify form submission to send role: 'external' for accounts, librarian, maintenance roles, and department as lowercase
- [x] Update ExternalDepartmentDashboard.jsx: Adjust logic to handle role: 'external' and lowercase departments
- [x] Update AdminNavbar.jsx: Update role checks for external departments
- [x] Update AdminDashboard.jsx: Update role routing for external departments
- [x] Update SuperAdminDashboard.jsx: Update role handling for external departments
- [x] Test the changes to ensure login works for external departments
