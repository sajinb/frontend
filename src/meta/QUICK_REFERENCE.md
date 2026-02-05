# Quick Visual Reference: Forms ↔ API Mapping

```
┌────────────────────────────────────────────────────────────────────┐
│                        REACT APPLICATION                            │
│                     Employee Management System                      │
└─────────────────┬────────────────────────┬─────────────────────────┘
                  │                        │
      ┌───────────▼──────────┐   ┌────────▼─────────────┐
      │  EmployeeForm        │   │   EmployeeList       │
      │  (CREATE MODE)       │   │   (TABLE DISPLAY)    │
      └──────────┬───────────┘   └─────────┬────────────┘
                 │                         │
                 │ [1] Submit Form         │ [2] On Mount / Refresh
                 │                         │
                 ▼                         ▼
        ┌────────────────┐        ┌────────────────┐
        │ createEmployee │        │ fetchEmployees │
        │                │        │                │
        │ POST /api/     │        │ GET /api/      │
        │    employees   │        │    employees   │
        └────────────────┘        └────────────────┘
                 │                         │
                 │                         ├──────────┐
                 ▼                         ▼          │
        ┌────────────────┐        ┌──────────────┐   │
        │ Employee       │        │ Display      │   │
        │ Created        │        │ Table        │   │
        │                │        │              │   │
        │ Form Reset     │        │ [Edit] Btn   │◄──┘
        └────────────────┘        └──────┬───────┘
                                         │
                                         │ [3] Click Edit
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │  EmployeeForm        │
                              │  (EDIT MODE)         │
                              └──────────┬───────────┘
                                         │
                                         │ [4] Submit Update
                                         │
                                         ▼
                                ┌────────────────┐
                                │ updateEmployee │
                                │                │
                                │ PUT /api/      │
                                │    employees/  │
                                │       {id}     │
                                └────────┬───────┘
                                         │
                                         ▼
                                ┌────────────────┐
                                │ Employee       │
                                │ Updated        │
                                │                │
                                │ List Refreshes │
                                └────────────────┘
```

---

## Form Fields Summary

### EmployeeForm (6 fields)

| Field       | Type   | Required | MaxLength | Backend Match |
|-------------|--------|----------|-----------|---------------|
| firstName   | text   | ✓        | 500       | ⚠️ NO (100)   |
| lastName    | text   | ✓        | 150       | ✓ YES         |
| email       | email  | ✓        | -         | ⚠️ Unspec     |
| position    | text   | ✗        | 200       | ✓ YES         |
| salary      | number | ✗        | -         | ✓ YES         |
| hiredDate   | date   | ✗        | -         | ✓ YES         |

⚠️ **Critical:** firstName has 500 char limit in UI but 100 in backend!

---

## API Endpoints

### ✅ Active Endpoints (3)

1. **POST /api/employees** 
   - Creates new employee
   - Used by: EmployeeForm (create mode)

2. **PUT /api/employees/{id}**
   - Updates existing employee
   - Used by: EmployeeForm (edit mode)

3. **GET /api/employees**
   - Lists all employees
   - Used by: EmployeeList

### ⚪ Unused Endpoints (1)

4. **GET /api/employees/{id}**
   - Fetches single employee
   - Defined but not used (list passes full object)

---

## Metadata Files

```
src/meta/
├── ui-metadata.json              ← UI field definitions
├── forms-metajson.json           ← Forms + Java annotations
├── backend.json                  ← Java entity structure
├── merged-forms-backend.json     ← Mismatches highlighted
└── FORMS_API_MAPPING_GUIDE.md    ← Full documentation
```

---

## Data Flow Sequences

### Create Flow
```
User Input → Validation → POST → Success → Reset Form
                            ↓
                          Failure → Show Error
```

### Update Flow
```
Click Edit → Load Form → User Edit → Validation → PUT → Success → Reload List
                                                     ↓
                                                   Failure → Show Error
```

### List Flow
```
Mount → GET → Success → Render Table
         ↓
       Failure → Show Error
```

---

## Component Files

| File | Lines | Purpose |
|------|-------|---------|
| `/src/components/EmployeeForm.jsx` | 82 | Form component (create/edit) |
| `/src/components/EmployeeList.jsx` | 76 | List component with edit |
| `/src/api/employeeApi.js` | 40 | API functions |
| `/src/App.jsx` | 15 | Root component |

---

## Error Handling

All components use:
- `loading` state → Disable buttons during API calls
- `error` state → Display error messages in red
- `try/catch` → Catch API failures gracefully

---

**Last Updated:** 2026-02-05  
**See Also:** FORMS_API_MAPPING_GUIDE.md (detailed documentation)
