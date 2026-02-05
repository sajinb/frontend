# Frontend Metadata Directory

This directory contains metadata files that document the structure and relationships between UI forms and backend APIs.

## Purpose

As a Frontend Architect, these files help you:
1. **Understand** all forms and their field definitions
2. **Map** UI forms to backend API endpoints
3. **Identify** mismatches between frontend and backend constraints
4. **Plan** necessary backend changes when UI requirements change

---

## Files in this Directory

### 📄 Documentation Files (Human-Readable)

#### `FORMS_API_MAPPING_GUIDE.md` ⭐ **START HERE**
The main comprehensive documentation that explains:
- All form components in the application
- Complete API endpoint mappings
- Data flow diagrams
- Validation strategies
- Known issues and recommendations

#### `QUICK_REFERENCE.md`
Visual quick reference with:
- ASCII diagrams of data flow
- Summary tables
- Quick lookup for developers

---

### 📊 Metadata Files (Machine-Readable JSON)

#### `ui-metadata.json`
**Purpose:** Current state of UI forms and fields

**Content:** 
- All form components and their API endpoints
- Field definitions (name, type, required, maxLength)
- HTTP methods for each form operation

**Use Case:** Frontend developers reference this to understand current UI constraints

---

#### `forms-metajson.json`
**Purpose:** UI forms with expected Java backend annotations

**Content:**
- Form fields with UI constraints (maxLength, required, etc.)
- Expected Java types (String, BigDecimal, LocalDate)
- Recommended Java annotations (@Column, @Size, @Email)
- Notes about validation requirements

**Use Case:** Backend developers use this to align Java entities with frontend needs

---

#### `backend.json`
**Purpose:** Current Java entity structure from backend

**Content:**
- Java entity class names
- Database table names
- Entity fields with column names
- Current column constraints (length, nullable, unique)
- Java types and validation constraints

**Use Case:** Reference for current backend state before making changes

---

#### `merged-forms-backend.json`
**Purpose:** Merged view showing UI ↔ Backend alignment

**Content:**
- Side-by-side comparison of UI and backend constraints
- **Mismatch detection** - highlights where UI and backend don't align
- Specific recommendations for fixing mismatches
- Risk assessment for data truncation or validation errors

**Use Case:** Critical for identifying and resolving inconsistencies

**Example Issue:** 
```json
"mismatch": {
  "issue": "UI maxLength (500) is greater than backend column length (100)",
  "recommendation": "Increase @Column(length = 500) on Java entity"
}
```

---

## Workflow: When to Use These Files

### Scenario 1: Adding a New Form Field

1. Add the field to your React component
2. Update `ui-metadata.json` with the new field definition
3. Update `forms-metajson.json` with expected Java annotations
4. Backend team reviews and adds field to Java entity
5. Update `backend.json` with the new entity structure
6. Regenerate `merged-forms-backend.json` to verify alignment

---

### Scenario 2: Changing Field Constraints

1. Update your React component (e.g., increase maxLength)
2. Update `ui-metadata.json` with new constraint
3. Update `forms-metajson.json` with new expected Java annotation
4. Check `merged-forms-backend.json` - will show new mismatch
5. Backend team updates Java entity and database migration
6. Update `backend.json` and `merged-forms-backend.json`

---

### Scenario 3: Understanding Current State

1. Read `QUICK_REFERENCE.md` for high-level overview
2. Read `FORMS_API_MAPPING_GUIDE.md` for detailed analysis
3. Check `merged-forms-backend.json` for any known mismatches
4. Plan fixes based on recommendations

---

## Current Status

### ✅ Documented

- EmployeeForm (Create & Update operations)
- EmployeeList (Read operation)
- Employee API endpoints (4 total, 3 active)

### ⚠️ Known Issues

1. **firstName field mismatch:**
   - UI allows 500 characters
   - Backend only accepts 100 characters
   - **Risk:** Data truncation or validation errors
   - **Action Required:** Align frontend and backend

2. **Unused API endpoint:**
   - GET /api/employees/{id} is defined but not used
   - Consider using it for edit operations or remove it

---

## Maintenance

**When to Update:**
- ✅ After adding new forms
- ✅ After modifying form fields
- ✅ After changing validation rules
- ✅ After backend entity changes
- ✅ Quarterly review for consistency

**Who Updates:**
- **Frontend Team:** ui-metadata.json, forms-metajson.json
- **Backend Team:** backend.json
- **Architecture Team:** merged-forms-backend.json, documentation files

---

## Tools & Scripts

Currently, these files are manually maintained. 

**Future Enhancement Ideas:**
- Automated script to generate ui-metadata.json from React components
- Automated script to generate backend.json from Java entities
- Automated merge script to create merged-forms-backend.json
- CI/CD validation to catch mismatches before deployment

---

## Related Documentation

- **Vite Config:** `/vite.config.js` - API proxy configuration
- **API Module:** `/src/api/employeeApi.js` - API function definitions
- **Components:** `/src/components/` - Form and list components

---

## Questions?

This metadata structure helps prevent common issues:
- ❌ User enters data that backend rejects
- ❌ Frontend expects different data shape than backend sends
- ❌ Database truncates user input silently
- ❌ Validation differs between frontend and backend

If you have questions about these files or need help updating them, contact the Frontend Architecture team.

---

**Last Updated:** 2026-02-05  
**Repository:** sajinb/frontend
