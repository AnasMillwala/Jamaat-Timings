# Simple Setup Checklist for Jamaat Timings

Follow this checklist to get your Jamaat Timings system running. You do not need any programming knowledge.

---

### Phase 1: Accessing the Live App (Ready Now)

- [x] **Database & Cloud Backend**: Firebase Cloud Firestore and Authentication are provisioned and active.
- [x] **Security Rules**: Deployed and locked down (Public read-only; admin-only write).
- [x] **Open the Web Application**: Open the preview or production URL in your browser on phone or desktop.

---

### Phase 2: Logging in as the Administrator

- [ ] Tap **"Private Admin App"** in the top navigation bar (or visit your app URL with `/#admin`).
- [ ] Tap **"Log In to Administrator Console"**.
- [ ] Click **"Sign in with Google"** and sign in using your designated account:
  ```
  millwala27@gmail.com
  ```
- [ ] You will now see the Admin Console dashboard with options to Add, Edit, and Delete Masjids.

---

### Phase 3: Managing Masjids & Timings

- [ ] **Add a Masjid**:
  1. Tap the black **"Add Masjid"** button.
  2. Enter the Masjid Name (e.g. *"Central Jamia Masjid"*).
  3. Set the 6 Jamaat prayer times using the 12-hour AM/PM picker:
     - 1. Fajr (e.g. 05:30 AM)
     - 2. Zuhr (e.g. 01:30 PM)
     - 3. Asr (e.g. 05:15 PM)
     - 4. Magrib (e.g. 06:45 PM)
     - 5. Isha (e.g. 08:30 PM)
     - 6. Jumua (e.g. 01:45 PM)
  4. Any timing not yet known can be left blank (tap "Leave Blank").
  5. Tap **"Save Changes"**.
- [ ] **Edit a Timing**:
  1. In the Admin Dashboard, tap the pencil/edit icon on any Masjid.
  2. Change the time.
  3. Tap **"Save Changes"**.
- [ ] **Verify Real-Time Public Update**:
  1. Open the Public App in another browser tab or on another phone.
  2. The updated timing appears automatically without needing to refresh or reinstall.

---

### Phase 4: Installing on Mobile Phones

#### For Public Users (Congregants):
- [ ] **iPhone**: Open the app link in Safari > Tap Share button > Tap **"Add to Home Screen"**.
- [ ] **Android**: Open the link in Chrome > Tap three dots > Tap **"Install app"** or **"Add to Home Screen"**.

#### For the Admin (You):
- [ ] Install the PWA to your Android home screen, or compile the standalone `.apk` using the instructions in `MOBILE_BUILD_GUIDE.md`.

---

### Need Help?
- Click the **"QA Test Suite"** button in the top bar to run real-time diagnostic checks on all 13 required test cases.
- Click the **"Mobile Build Guide"** button in the top bar for Android Studio and Xcode command-line instructions.
