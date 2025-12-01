# Login Troubleshooting Guide

## 🔍 Common Login Issues and Solutions

### Issue: "Invalid login credentials" after seeding

This can happen for several reasons. Follow these steps to diagnose and fix:

---

## ✅ Step 1: Verify Admin Accounts Exist

Run the verification script to check if admin accounts are properly configured:

```bash
npm run verify-admins
```

This will:
- Check if passwords are properly hashed
- Verify account status (active/locked)
- Test password verification
- Display all login credentials

---

## ✅ Step 2: Fix Role Migration (if needed)

If you have old admin accounts with roles `assistant_hod` or `hod`, migrate them:

```bash
npm run migrate-roles
```

This will:
- Convert `assistant_hod` → `additional_hod`
- Convert `hod` → `dean`

---

## ✅ Step 3: Fix Email Addresses (if needed)

If admin accounts have old email patterns, fix them:

```bash
npm run fix-emails
```

This will:
- Update `*.assistant@university.edu` → `*.additional@university.edu`
- Update `*.hod@university.edu` → `*.dean@university.edu`

---

## ✅ Step 4: Ensure All Required Admins Exist

Make sure all departments have coordinators, additional HODs, and deans:

```bash
npm run ensure-all-admins
```

This will:
- Check for missing admin accounts
- Create any missing accounts automatically
- Display all login credentials

---

## 🔑 Correct Login Credentials

### Super Admin
- **Email:** `superadmin@university.edu`
- **Password:** `superadmin123456`
- **Role:** `super_admin`
- **Department:** N/A

### Department Admins

**Format:** `[department].coordinator@university.edu` / `[department]123456`

**Example for MCA:**
- Coordinator: `mca.coordinator@university.edu` / `mca123456`
- Additional HOD: `mca.additional@university.edu` / `mca123456`
- Dean: `mca.dean@university.edu` / `mca123456`

**Important:** Use the correct email format:
- ✅ `mca.additional@university.edu` (correct)
- ❌ `mca.assistant@university.edu` (old format)

- ✅ `mca.dean@university.edu` (correct)
- ❌ `mca.hod@university.edu` (old format)

---

## 🚨 Common Issues

### 1. Wrong Email Format
**Problem:** Using old email addresses like `mca.assistant@university.edu` or `mca.hod@university.edu`

**Solution:** Run `npm run fix-emails` to update email addresses

### 2. Wrong Role Selected
**Problem:** Selecting wrong role in login form

**Solution:** 
- For coordinator accounts, select role: `coordinator`
- For additional HOD accounts, select role: `additional_hod`
- For dean accounts, select role: `dean`
- For super admin, select role: `super_admin`

### 3. Wrong Department Selected
**Problem:** Selecting wrong department in login form

**Solution:** Make sure the department matches the admin's department:
- MCA coordinator → Department: `MCA`
- MBA coordinator → Department: `MBA`
- etc.

### 4. Account Locked
**Problem:** Account locked due to multiple failed login attempts

**Solution:** Run `npm run verify-admins` to unlock accounts

### 5. Account Inactive
**Problem:** Account is deactivated

**Solution:** Run `npm run verify-admins` to activate accounts

### 6. Password Not Hashed
**Problem:** Password stored in plain text instead of hashed

**Solution:** Run `npm run verify-admins` to fix password hashing

---

## 📋 Quick Fix Commands

Run these commands in order to fix all login issues:

```bash
# 1. Migrate old roles
npm run migrate-roles

# 2. Fix email addresses
npm run fix-emails

# 3. Verify and fix all admin accounts
npm run verify-admins

# 4. Ensure all required admins exist
npm run ensure-all-admins
```

---

## 🔍 Debugging Login Issues

### Check Server Logs
The login controller logs detailed information. Check your server console for:
- Admin login attempts
- Admin found/not found messages
- Role/department mismatches
- Password validation results

### Test Login Credentials
Use the verification script to test credentials:

```bash
npm run verify-admins
```

This will test password verification for all accounts.

---

## 📞 Still Having Issues?

1. **Check the exact error message** - It will tell you what's wrong
2. **Verify email format** - Must match `*.coordinator@university.edu`, `*.additional@university.edu`, or `*.dean@university.edu`
3. **Check role selection** - Must match the account's role
4. **Check department selection** - Must match the account's department
5. **Run verification script** - `npm run verify-admins` to check everything

---

## ✅ Verification Checklist

Before logging in, verify:
- [ ] Admin account exists in database
- [ ] Email address is correct format
- [ ] Role matches the account's role
- [ ] Department matches the account's department
- [ ] Password is correct (format: `[department]123456`)
- [ ] Account is active (`isActive: true`)
- [ ] Account is not locked (`isLocked: false`)
- [ ] Password is properly hashed (starts with `$2a$`, `$2b$`, or `$2y$`)

---

## 🎯 Quick Reference

**All Commands:**
```bash
npm run seed              # Seed all admin accounts
npm run verify-admins     # Verify and fix admin accounts
npm run migrate-roles     # Migrate old roles to new roles
npm run fix-emails        # Fix email addresses
npm run ensure-all-admins # Ensure all required admins exist
npm run ensure-coordinators # Ensure coordinators exist
```

