# Android Phone Guide: Download & Build APK Without a Computer

This guide is specifically written for someone using an **Android phone** with **no computer** and **no coding experience**.

---

## 1. What You Have Right Now

1. **The Live Web Application (Both Apps)**:
   - **Public Jamaat Timings App**: Fully working right now in your mobile browser.
   - **Private Admin App**: Fully working right now when you switch to Admin Mode and sign in with `millwala27@gmail.com`.
   - **Shared Database**: Live Cloud Firestore database is active and syncing in real-time.

2. **Downloadable Source Code ZIP Archive**:
   - The file `jamaat-timings-source.zip` is built and available directly from the app.
   - You can download it directly into your Android phone's **Downloads** folder by tapping the **"Download Project ZIP"** button in the app header or visiting `/jamaat-timings-source.zip`.

---

## 2. Option A: Use Directly on Your Phone (Zero Build Required)

You do **not** actually need to compile an APK to install this on your phone:

1. In your Android phone's Chrome browser, open the app URL.
2. Tap the **Three Dots menu** in the top right corner of Chrome.
3. Tap **"Install app"** (or **"Add to Home Screen"**).
4. Tap **"Install"**.
5. The **Jamaat Timings** app icon will appear directly on your Android phone's home screen.
6. It opens in full screen with no browser bar, fast offline caching, and instant real-time updates!

---

## 3. Option B: Build a Standalone `.apk` File on Your Phone (Using Free GitHub Cloud Build)

Since this Google AI Studio environment is a lightweight web server without Android Studio or Gradle installed, it cannot compile native Android binary `.apk` files directly.

However, we have pre-configured a **100% automated Cloud Builder** in `.github/workflows/build-apk.yml`. You can trigger it from your Android phone without writing a single line of code:

### Step 1: Download the Project ZIP to Your Phone
- Tap the **"Download Project ZIP"** button in the app (or go to `/jamaat-timings-source.zip`).
- The file `jamaat-timings-source.zip` will download to your phone.

### Step 2: Create a Free GitHub Account on Your Phone
- Open `https://github.com` on your Android phone.
- If you don't have an account, sign up for free.

### Step 3: Create a New Repository and Upload the ZIP Contents
1. On GitHub, tap the **"+"** button at the top > **"New repository"**.
2. Name it `jamaat-timings` and tap **"Create repository"**.
3. Under *"Quick setup"*, tap **"uploading an existing file"**.
4. Extract the ZIP on your phone (using your phone's built-in "Files" app) and upload the files, or push the repo.
5. Tap **"Commit changes"**.

### Step 4: GitHub Automatically Builds Your APK
1. Tap the **"Actions"** tab at the top of your GitHub repository.
2. You will see **"Build Android APK"** running automatically.
3. Wait approximately 2 to 3 minutes for the green checkmark (`Build Standalone Android APK`).

### Step 5: Download & Install the APK on Your Phone
1. Tap the completed build run.
2. Under **Artifacts** at the bottom, tap **"Jamaat-Timings-Admin-APK"**.
3. Your phone will download the ZIP containing `app-debug.apk`.
4. Open your phone's "Files" app, tap `app-debug.apk`.
5. Tap **Install** (if prompted, allow installation of unknown apps from your Files app).
6. Done! The native Android APK is now installed privately on your Android phone!

---

## 4. Current Configuration Status Check

| Component | Status | Action Required from You |
|---|---|---|
| **Cloud Firestore Database** | **Fully Configured** | None. Real-time database is live (`ai-studio-40ba68aa-015a-4533-a836-719a460acb5b`). |
| **Firestore Security Rules** | **Deployed & Locked** | None. Public read-only; admin-only writes. |
| **Admin Authorization** | **Configured** | Admin email set to `millwala27@gmail.com`. |
| **Google Authentication** | **Configured** | When signing in for the first time on a custom domain, ensure the domain is listed under Firebase Console > Authentication > Settings > Authorized Domains. |
| **Source Code Export** | **Generated** | `jamaat-timings-source.zip` ready for 1-tap download in the app. |
