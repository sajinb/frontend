# Forms to API Mapping Documentation

## Overview

This document provides a comprehensive mapping of all UI Forms and Data Entry components to their outgoing API calls in the React frontend application.

**Last Updated:** 2026-02-05  
**Analysis Date:** 2026-02-05

---

## Summary

- **Total Form Components:** 1 (EmployeeForm)
- **Total API Endpoints:** 4
- **Active API Endpoints:** 3 (POST, PUT, GET)
- **Unused API Endpoints:** 1 (GET single employee by ID)

---

## 1. Form Components

### EmployeeForm Component

**File:** `/src/components/EmployeeForm.jsx`

**Purpose:** Dual-purpose form for creating new employees and updating existing employee records.

**Features:**
- Single reusable component for both Create and Update operations
- Client-side validation
- Loading states during API calls
- Error handling with user-friendly messages
- Automatic form reset after successful submission

**Form Fields:**

| Field Name | HTML Type | Required | Max Length | Validation |
|-----------|-----------|----------|------------|------------|
| firstName | text | Yes | 500 | Required, ≤500 chars |
| lastName | text | Yes | 150 | Required, ≤150 chars |
| email | email | Yes | - | Required, email format |
| position | text | No | 200 | ≤200 chars |
| salary | number | No | - | Converted to number or null |
| hiredDate | date | No | - | Date format (YYYY-MM-DD) |

---

## 2. API Mappings

### 2.1 Create Employee (POST)

**Form Component:** EmployeeForm (Create Mode)  
**Trigger:** Form submission when `form.id` is NOT set  
**API Function:** `createEmployee(employee)`  
**API Endpoint:** `POST /api/employees`

**Request:**
```json
{
  "firstName": "string (max 500 chars)",
  "lastName": "string (max 150 chars)",
  "email": "string (email format)",
  "position": "string (max 200 chars)",
  "salary": number | null,
  "hiredDate": "YYYY-MM-DD"
}
```

**Response:** Employee object with ID assigned

**Data Flow:**
1. User fills form → 2. Clicks "Create" → 3. Client-side validation → 4. API POST → 5. Success: Form reset → 6. Error: Display message

**Code Location:** `/src/components/EmployeeForm.jsx` lines 40-43

---

### 2.2 Update Employee (PUT)

**Form Component:** EmployeeForm (Edit Mode)  
**Trigger:** Form submission when `form.id` IS set  
**API Function:** `updateEmployee(id, employee)`  
**API Endpoint:** `PUT /api/employees/{id}`

**Request:**
- URL Parameter: `id` (employee ID)
- Body: Same as Create Employee

**Response:** Updated employee object

**Data Flow:**
1. User clicks "Edit" in list → 2. Form populates → 3. User modifies → 4. Clicks "Update" → 5. Validation → 6. API PUT → 7. Success: List reloads → 8. Error: Display message

**Code Location:** `/src/components/EmployeeForm.jsx` lines 40-41

---

### 2.3 List Employees (GET)

**Component:** EmployeeList  
**Trigger:** Component mount and after successful save  
**API Function:** `fetchEmployees()`  
**API Endpoint:** `GET /api/employees`

**Request:** None

**Response:** Array of employee objects

**Data Flow:**
1. Component mounts → 2. API GET → 3. Store in state → 4. Render table

**Code Location:** `/src/components/EmployeeList.jsx` lines 11-22

---

### 2.4 Get Single Employee (UNUSED)

**API Function:** `fetchEmployee(id)`  
**API Endpoint:** `GET /api/employees/{id}`

**Status:** Defined but not used in the UI. The edit functionality passes the full employee object from the list instead of fetching by ID.

---

## 3. Component Architecture

```
App.jsx (Root)
│
├── EmployeeForm (Create Mode)
│   └── Calls: createEmployee() → POST /api/employees
│
└── EmployeeList
    ├── Calls: fetchEmployees() → GET /api/employees
    │
    └── EmployeeForm (Edit Mode - conditional)
        └── Calls: updateEmployee() → PUT /api/employees/{id}
```

---

## 4. Validation Strategy

### Client-Side Validation (Frontend)

**Location:** `/src/components/EmployeeForm.jsx`

1. **HTML5 Validation:**
   - Required fields (firstName, lastName, email)
   - Email format validation
   - Number type for salary

2. **Custom JavaScript Validation:**
   - Field length checks: firstName (≤500), lastName (≤150), position (≤200)
   - Executed before API call
   - Displays error message if validation fails

### Server-Side Validation (Backend)

Expected to exist on backend (not implemented in frontend). See `backend.json` for Java entity constraints.

---

## 5. Important Findings & Discrepancies

### ⚠️ Field Length Mismatch: firstName

**Frontend (UI):**
- Max Length: 500 characters
- Location: `src/components/EmployeeForm.jsx` line 12

**Backend (Java Entity):**
- Column Length: 100 characters
- Annotations: `@Column(length = 100)`, `@Size(max = 100)`

**Impact:** Users can enter up to 500 characters in the UI, but the backend will reject or truncate values exceeding 100 characters, causing data loss or validation errors.

**Recommendation:** 
- **Option 1:** Update backend to support 500 characters (requires database migration)
- **Option 2:** Reduce frontend maxLength to 100 to match backend

---

## 6. Error Handling Pattern

All API calls follow consistent error handling:

```javascript
try {
  setLoading(true)
  const result = await apiFunction(params)
  // Handle success
} catch (err) {
  setError(err.message)  // Display in UI
} finally {
  setLoading(false)
}
```

**Features:**
- Loading state prevents duplicate submissions
- Error messages displayed inline in forms
- User-friendly error messages from API

---

## 7. API Module

**File:** `/src/api/employeeApi.js`

**Technology:** Native Fetch API

**Base URL:** `/api/employees`

**Functions:**
1. `fetchEmployees()` - GET all employees
2. `fetchEmployee(id)` - GET single employee (unused)
3. `createEmployee(employee)` - POST new employee
4. `updateEmployee(id, employee)` - PUT update employee

**Error Handling:**
- Throws errors on non-ok HTTP responses
- Extracts error message from JSON response body
- Falls back to generic error messages

---

## 8. State Management

**Library:** React Hooks (useState, useEffect)

**Form State:**
- Form data (controlled inputs)
- Loading state (boolean)
- Error messages (string)

**List State:**
- Employees array
- Loading state
- Error messages
- Editing state (selected employee for edit)

---

## 9. Related Metadata Files

This repository contains several metadata files that describe the forms and APIs:

1. **ui-metadata.json** - Current UI form structure and field attributes
2. **forms-metajson.json** - UI forms with expected Java backend annotations
3. **backend.json** - Java entity structure from backend
4. **merged-forms-backend.json** - Merged view showing mismatches between UI and backend

**Note:** These files have been updated to reflect the actual current state of the UI (firstName maxLength = 500).

---

## 10. Future Enhancements

### Recommended Improvements:

1. **DELETE Operation:** Add ability to delete employees for complete CRUD
2. **Confirmation Dialogs:** Add confirmation for destructive operations
3. **Optimistic Updates:** Update UI immediately before API response
4. **Request Cancellation:** Cancel in-flight requests when component unmounts
5. **Form Library:** Consider using Formik or React Hook Form for complex validation
6. **Authentication:** Add authentication headers/tokens to API requests
7. **Retry Logic:** Implement automatic retry for failed requests
8. **Field Consistency:** Align firstName maxLength between frontend and backend

---

## Appendix: Quick Reference Table

| Component | Operation | Endpoint | Method | Form Fields |
|-----------|-----------|----------|--------|-------------|
| EmployeeForm | Create | /api/employees | POST | All 6 fields |
| EmployeeForm | Update | /api/employees/{id} | PUT | All 6 fields + ID |
| EmployeeList | List All | /api/employees | GET | N/A (display) |
| (Unused) | Get One | /api/employees/{id} | GET | N/A |

---

**Maintained By:** Frontend Architecture Team  
**Repository:** sajinb/frontend
