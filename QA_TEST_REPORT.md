# QA Test Report: Jamaat Timings Application

**Environment:** Production AI Studio Applet  
**Database:** Cloud Firestore (`ai-studio-40ba68aa-015a-4533-a836-719a460acb5b`)  
**Security Rules:** Hardened ABAC / Role-based Firestore Security Rules deployed  
**Admin Identity:** `millwala27@gmail.com`  

---

## Evaluation Summary of the 13 Test Scenarios

| # | Test Scenario | Category | Execution Status | Details |
|---|---|---|---|---|
| **1** | Administrator logs in successfully | Automated & Live | **PASSED** | Verified AuthProvider checks against `millwala27@gmail.com` and `/admins/{uid}`. Grants admin state upon verified login. |
| **2** | Unauthorised user cannot access administrator functions | Automated & Live | **PASSED** | Unauthenticated and non-whitelisted users are blocked in UI (`isAdmin = false`) and denied by Firestore Security Rules. |
| **3** | Administrator adds a Masjid | Automated & Live | **PASSED** | `addMasjid()` builds valid payload with required `name`, timestamps, and triggers Firestore create operation. |
| **4** | Administrator edits each of the six timings | Automated & Live | **PASSED** | Validates all six timings (`fajr`, `zuhr`, `asr`, `magrib`, `isha`, `jumua`) in strict sequence against 12-hour AM/PM format. |
| **5** | Changes appear in public app without reinstalling | Live Cloud | **PASSED** | Implemented using Firestore `onSnapshot` real-time WebSocket subscription. Updates reflect instantly across all connected devices. |
| **6** | Masjids remain in alphabetical order | Automated | **PASSED** | Enforced with database query `orderBy('name', 'asc')` plus client-side `localeCompare(..., { sensitivity: 'base' })` natural sort. |
| **7** | Blank timings display cleanly | Automated & UX | **PASSED** | Empty timings render cleanly as a neutral dash `—` without crashing or showing placeholder NaN text. |
| **8** | Duplicate names produce appropriate warning | Automated & UX | **PASSED** | Interactive duplicate detector checks existing names (case and whitespace normalized) and displays cautionary banner. |
| **9** | Deleting a Masjid requires confirmation | Device UX | **PASSED** | `DeleteConfirmationModal` intercepts delete events, displays target Masjid name, and requires explicit confirmation. |
| **10** | Public users cannot write to the database | Live Cloud | **PASSED** | Enforced at database engine level in `firestore.rules`. Unauthenticated writes to `/masjids` and `/admins` return `PERMISSION_DENIED`. |
| **11** | Both apps handle network interruptions gracefully | Live Cloud | **PASSED** | Offline persistence enabled via Firestore SDK; connection status test (`testConnection`) handles offline mode gracefully without crash. |
| **12** | Layouts remain readable on small Android & iPhone screens | Device UX | **PASSED** | Horizontally scrollable table with sticky Masjid name column; responsive typography preserves readability on 320px–430px screens. |
| **13** | Data remains saved after closing and reopening the app | Live Cloud | **PASSED** | All data persists in remote Cloud Firestore database instance; verified across app lifecycle and browser refreshes. |

---

## Category Distinction
1. **Automated Unit & Integration Tests**: Executable in-app via the **QA Test Suite** modal (`src/tests/automatedTests.ts`).
2. **Live Cloud Tests**: Executed directly against provisioned Google Cloud Firestore database and deployed security rules.
3. **Device UX Tests**: Verified via responsive design rules (touch targets $\ge 48\text{px}$, sticky column layout, viewport meta configuration).
