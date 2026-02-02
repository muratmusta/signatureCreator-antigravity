---
description: Testing Strategy & Results
---

# Testing Documentation

## ✅ Completed Tests (Automated E2E)

**Test Suite**: `tests/navigation.spec.ts`
**Status**: ✅ Passed (5/5 tests)
**Last Run**: 2026-02-02 21:55

### Scenarios Covered:
1.  **Home Page**: Loads correctly with title and main CTA.
2.  **Login Page**: Loads with "Google ile Giriş Yap" button.
3.  **Register Page**: Loads with "Google ile Kayıt Ol" button.
4.  **Protected Routes (Dashboard)**: Redirects unauthenticated users to Login.
5.  **Protected Routes (Editor)**: Redirects unauthenticated users to Login.

## 🔄 Planned Tests

### 1. Manual Testing Checklist (Phase 9.2)
- [ ] **Auth Flow**: Log in with real Google account, verify storage session.
- [ ] **Signature Creation**:
  - [ ] Create new signature
  - [ ] Change template
  - [ ] Edit fields (Name, Title, etc.)
  - [ ] Upload logo
- [ ] **Persistence**:
  - [ ] Save signature
  - [ ] Reload page -> details should persist
- [ ] **Export**:
  - [ ] Render HTML
  - [ ] Download PDF
  - [ ] Download PNG
- [ ] **Navigation**:
  - [ ] Verify "Dashboard'a Dön" on all pages.

### 2. Unit Tests (Phase 9.1 Continued)
- [ ] `generateAutoLogo` utility function.
- [ ] `renderSignatureToHtml` (verify output structure).

## 🛠️ How to Run Tests

### E2E Tests (Playwright)
```bash
npx playwright test
```

### Manual Testing
1. Run dev server: `npm run dev`
2. Open `http://localhost:3000`
3. Follow the manual checklist above.
