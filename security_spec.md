# Security Specification & Test Payloads for Jamaat Timings

## 1. Data Invariants
- **Public Read Access**: Any unauthenticated or authenticated user may read all documents in `/masjids/{masjidId}` to display Jamaat prayer times.
- **Strict Admin-Only Writes**: Only verified administrators (`request.auth.token.email_verified == true && (request.auth.token.email == 'millwala27@gmail.com' || exists(/databases/$(database)/documents/admins/$(request.auth.uid)))`) may create, update, or delete records in `/masjids/{masjidId}` or `/admins/{adminId}`.
- **No Self-Privilege Escalation**: Non-admins cannot create or edit documents in `/admins/{adminId}`.
- **Type & Size Strictness**:
  - `name`: string, 1 to 120 characters.
  - Timings (`fajr`, `zuhr`, `asr`, `magrib`, `isha`, `jumua`): string, max 10 characters (either empty or formatted like `05:30 AM`).
- **Forbidden Shadow Fields**: No unexpected keys (e.g. `isAdmin`, `verified`, arbitrary scripts) may be written.
- **Default Deny**: All unspecified paths are closed.

---

## 2. The Dirty Dozen Security Test Payloads (Must be Denied)

1. **Unauthenticated Masjid Creation**:
   - `Auth`: null
   - `Path`: `/masjids/new-masjid`
   - `Payload`: `{"name": "Hacker Masjid", "fajr": "05:00 AM"}`
   - `Expected`: PERMISSION_DENIED

2. **Unauthenticated Masjid Deletion**:
   - `Auth`: null
   - `Path`: `/masjids/existing-masjid`
   - `Operation`: DELETE
   - `Expected`: PERMISSION_DENIED

3. **Non-Admin Authenticated User Masjid Modification**:
   - `Auth`: `uid: "attacker123", email: "random@example.com", email_verified: true`
   - `Path`: `/masjids/existing-masjid`
   - `Payload`: `{"name": "Defaced Name"}`
   - `Expected`: PERMISSION_DENIED

4. **Spoofed Unverified Email Admin Write**:
   - `Auth`: `uid: "attacker999", email: "millwala27@gmail.com", email_verified: false`
   - `Path`: `/masjids/masjid-1`
   - `Payload`: `{"name": "Spoofed Update"}`
   - `Expected`: PERMISSION_DENIED

5. **Shadow Field Injection**:
   - `Auth`: `millwala27@gmail.com` (admin)
   - `Path`: `/masjids/masjid-1`
   - `Payload`: `{"name": "Central Masjid", "isSuperRootAdmin": true}`
   - `Expected`: PERMISSION_DENIED (violates `hasOnly` schema key restrictions)

6. **Overlength / Denial-of-Wallet Name Payload**:
   - `Auth`: `millwala27@gmail.com`
   - `Path`: `/masjids/masjid-1`
   - `Payload`: `{"name": "A" * 5000}`
   - `Expected`: PERMISSION_DENIED (exceeds 120 char limit)

7. **Invalid Type for Prayer Time**:
   - `Auth`: `millwala27@gmail.com`
   - `Path`: `/masjids/masjid-1`
   - `Payload`: `{"name": "Central Masjid", "fajr": 12345}`
   - `Expected`: PERMISSION_DENIED (fajr must be string)

8. **Overlength Prayer Timing**:
   - `Auth`: `millwala27@gmail.com`
   - `Path`: `/masjids/masjid-1`
   - `Payload`: `{"name": "Central Masjid", "fajr": "05:30 AM EXTRA LONG INJECTION STRING"}`
   - `Expected`: PERMISSION_DENIED (exceeds 10 char limit)

9. **Self-Promotion to Admin by Non-Admin**:
   - `Auth`: `uid: "attacker123", email: "attacker@gmail.com"`
   - `Path`: `/admins/attacker123`
   - `Payload`: `{"email": "attacker@gmail.com", "role": "admin"}`
   - `Expected`: PERMISSION_DENIED

10. **Malicious Document ID Path Injection**:
    - `Auth`: `millwala27@gmail.com`
    - `Path`: `/masjids/../../system_config`
    - `Expected`: PERMISSION_DENIED (fails regex `isValidId`)

11. **Blank / Empty Masjid Name**:
    - `Auth`: `millwala27@gmail.com`
    - `Path`: `/masjids/masjid-empty`
    - `Payload`: `{"name": ""}`
    - `Expected`: PERMISSION_DENIED (minLength 1 required)

12. **Tampering with Admins Collection by Public**:
    - `Auth`: null
    - `Path`: `/admins` (list)
    - `Expected`: PERMISSION_DENIED
