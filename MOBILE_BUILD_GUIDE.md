# Mobile Build & Distribution Guide: Jamaat Timings

This guide provides step-by-step instructions for:
1. **Building and privately installing the Android Admin APK** (without publishing to Google Play).
2. **Distributing the Public User App** to Android and iPhone users (PWA and App Store).
3. **Building the native iOS app** using Xcode on macOS.

---

## Part 1: Building the Private Admin Android APK

The Private Admin App allows the owner (`millwala27@gmail.com`) to manage Masjid records and update Jamaat timings. It can be installed as an `.apk` file directly on your Android phone.

### Prerequisites (on your computer)
1. **Node.js** (v18 or newer)
2. **Android Studio** (free download from [developer.android.com/studio](https://developer.android.com/studio))
3. **Java Development Kit (JDK 17+)** (included with Android Studio)

### Step 1: Install Capacitor in the Project
Run the following in the project terminal:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Step 2: Build the Web Assets and Initialize Android Project
```bash
# Build the production optimized bundle
npm run build

# Initialize Capacitor project
npx cap init "Jamaat Timings Admin" com.jamaattimings.admin --web-dir dist

# Add the Android native platform
npx cap add android
```

### Step 3: Configure Default Route for the Admin APK
In `src/App.tsx`, set the default view to `admin` for the APK build:
```typescript
const [currentView, setCurrentView] = useState<'public' | 'admin'>('admin');
```
Then re-run:
```bash
npm run build && npx cap copy android
```

### Step 4: Generate the Standalone APK File
You can compile the `.apk` directly from the command line:
```bash
cd android
./gradlew assembleDebug
```
*On Windows, run `gradlew.bat assembleDebug`.*

### Step 5: Locate Your APK File
Once Gradle finishes, your ready-to-install APK file is located at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Step 6: Install the APK on Your Android Phone Privately
1. Transfer `app-debug.apk` to your Android phone via:
   - USB cable
   - Google Drive / OneDrive
   - WhatsApp / Telegram self-chat
   - Email attachment
2. On your phone, tap the `app-debug.apk` file.
3. If Android displays: *"For your security, your phone is not allowed to install unknown apps from this source"*:
   - Tap **Settings**.
   - Enable **"Allow from this source"**.
4. Tap **Install**.
5. The **Jamaat Timings Admin** app icon will appear on your home screen.

---

## Part 2: Distributing the Public Jamaat Timings App

Public users (congregants) require instant access on both Android and iPhone without creating accounts or downloading complex packages.

### Method A: Progressive Web App (PWA) — Instant & Free (Recommended)
This requires zero app store fees, zero developer account costs, and works immediately on all Android and iOS devices.

#### For iPhone / iPad Users (iOS Safari):
1. Open the public web application URL in Safari.
2. Tap the **Share** button (the square with an arrow pointing upward).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **"Add"**.
5. The **Jamaat Timings** icon appears on the iOS home screen. When launched, it runs in full-screen standalone mode with no browser address bar.

#### For Android Users (Chrome / Samsung Internet):
1. Open the public web application URL.
2. A banner **"Add Jamaat Timings to Home Screen"** will appear automatically, or tap the three dots in Chrome and select **"Install App"**.
3. The app installs locally and opens like any native Android app.

---

## Part 3: Building Native iOS App via Xcode (macOS Required)

If you wish to publish the public app on the Apple App Store:

### Prerequisites:
1. Mac computer running macOS.
2. Xcode (free from Mac App Store).
3. Apple Developer Account ($99/year) if publishing to App Store or TestFlight.

### Steps:
```bash
# 1. Install iOS Capacitor dependency
npm install @capacitor/ios

# 2. Add iOS native platform
npm run build
npx cap add ios

# 3. Open in Xcode
npx cap open ios
```

4. In Xcode:
   - Select your project in the left navigator.
   - Go to **Signing & Capabilities**.
   - Check **Automatically manage signing** and choose your Apple Developer Team.
   - Connect an iPhone via USB or choose an iOS Simulator.
   - Click the **Play** button to run on your device.
   - To publish: Select **Product > Archive** > **Distribute App** > **App Store Connect / TestFlight**.

---

## Part 4: Firebase Configuration Reference

The application uses:
- **Project ID**: `centered-jet-cc70r`
- **Database ID**: `ai-studio-40ba68aa-015a-4533-a836-719a460acb5b`
- **Admin Email**: `millwala27@gmail.com`
- **Firestore Security Rules**: Deployed in `firestore.rules`.
