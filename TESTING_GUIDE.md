# Admin Dashboard Testing Guide

## Starting the Development Server

### Option 1: Using PowerShell (Recommended)
```powershell
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH
npm run dev
```

### Option 2: Using start-dev.bat
The batch file may need updates to work properly in PowerShell. Use Option 1 for now.

## Admin Dashboard URL

**Main Dashboard**: http://localhost:3000/admin

## Features to Test

### 1. Dashboard (/)
- ✅ View statistics cards (Total Members, Active Members, Departments, Alumni)
- ✅ View recent activity log
- ✅ Quick action buttons

### 2. Members Management (/admin/members)

#### View Members List
- ✅ Search by name, email, or role
- ✅ Filter by status (All, Active, Alumni, Inactive)
- ✅ View member cards with department info
- ✅ Department name resolution from IDs

#### Add New Member (/admin/members/add)
- ✅ Fill out form with required fields (name*, email*, role*, department*)
- ✅ Optional fields: phone, bio, join date, LinkedIn, GitHub
- ✅ Form validation:
  - Email format validation
  - Phone format validation (if provided)
  - URL format validation for social links
  - Required field validation
- ✅ See inline error messages on invalid fields
- ✅ Receive success toast notification
- ✅ Redirect to members list on success

#### Edit Member (/admin/members/[id])
- ✅ Load existing member data
- ✅ Update any field
- ✅ Same validation as add form
- ✅ See inline error messages
- ✅ Receive success toast notification
- ✅ Navigate back to members list

#### Delete Member
- ✅ Click delete button on member card
- ✅ See confirmation dialog
- ✅ Confirm deletion
- ✅ Receive success toast notification
- ✅ Member removed from list

### 3. Department Management (/admin/departments)
- ⚠️ **Needs Testing** - Page exists but may need mockApi integration verification

### 4. Projects Management (/admin/projects)
- ✅ View stub page with stat cards
- ⏳ Full implementation pending

### 5. Events Management (/admin/events)
- ✅ View stub page with calendar
- ⏳ Full implementation pending

### 6. Settings (/admin/settings)
- ✅ View organization settings
- ✅ Update organization info
- ✅ Toggle feature visibility
- ✅ Save changes with toast notification

## Testing Checklist

### Core Functionality
- [ ] Dashboard loads and shows correct statistics
- [ ] Member list displays all members
- [ ] Search filter works correctly
- [ ] Status filter works correctly
- [ ] Add member form validates correctly
- [ ] Add member form creates new member
- [ ] Edit member form loads data correctly
- [ ] Edit member form updates member
- [ ] Delete member shows confirmation
- [ ] Delete member removes member
- [ ] Toast notifications appear for all actions
- [ ] Confirmation dialog works properly

### Data Persistence
- [ ] Create a new member
- [ ] Refresh the page
- [ ] Verify new member still appears (localStorage)
- [ ] Edit a member
- [ ] Refresh the page
- [ ] Verify changes persisted
- [ ] Delete a member
- [ ] Refresh the page
- [ ] Verify member is gone

### Validation Testing
- [ ] Try to submit empty add form → see error messages
- [ ] Enter invalid email → see email error
- [ ] Enter invalid phone → see phone error
- [ ] Enter invalid URL → see URL error
- [ ] Enter valid data → form submits successfully

### UI/UX Testing
- [ ] Navigation sidebar works
- [ ] Mobile menu works (if applicable)
- [ ] Dark mode toggle works
- [ ] All buttons are clickable
- [ ] All links navigate correctly
- [ ] Loading states appear during operations
- [ ] Error states display properly

## Mock Data

The admin dashboard uses mock data from `lib/data.ts`:
- **74 sample members** across 8 departments
- **8 departments**: Engineering, Marketing, Design, Sales, Support, HR, Finance, Operations

All data is stored in **localStorage** under keys:
- `datastreet_members`
- `datastreet_departments`

### Resetting Mock Data
To reset to initial state, clear localStorage:
```javascript
// In browser console
localStorage.removeItem('datastreet_members');
localStorage.removeItem('datastreet_departments');
// Refresh page
```

## Known Limitations

1. **Mock API Only**: No real database - all data in localStorage
2. **No Authentication**: Admin pages are publicly accessible
3. **No Image Upload**: Profile images use placeholder URLs
4. **Department Page**: May need additional testing
5. **Projects/Events**: Stub implementations only
6. **No Skills Management**: Skills are stored as array but no dedicated management UI

## Next Steps After Testing

1. **If issues found**:
   - Document specific errors
   - Check browser console for JavaScript errors
   - Check terminal for compilation errors
   - Report issues for fixing

2. **If everything works**:
   - Consider adding authentication
   - Implement real database (Prisma + PostgreSQL)
   - Build out Projects management
   - Build out Events management
   - Add image upload functionality
   - Add export/import functionality
   - Add pagination for large member lists

## Success Criteria

The admin dashboard is production-ready when:
- ✅ All CRUD operations work (Create, Read, Update, Delete)
- ✅ Form validation prevents bad data
- ✅ Toast notifications provide user feedback
- ✅ Data persists across page refreshes
- ✅ No console errors
- ✅ No TypeScript compilation errors
- ✅ UI is responsive and accessible
- ✅ All navigation works correctly

## Browser Compatibility

Test in:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ⚠️ Safari (may need testing)

## Performance

Expected performance:
- Dashboard load: < 1 second
- Member list load: < 500ms
- Form validation: Instant
- CRUD operations: 300-400ms (simulated delay)
- Toast notifications: 4 second auto-dismiss
