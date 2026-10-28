# Skhtor Admin – Windows

## Option A – Chrome (no build)
Install Node.js, then double-click `run-in-chrome.bat`. Keep the window open (minimized is fine, don't close it).

## Option B – EXE
Install Node.js, open a terminal here and run:
    npm install
    npm start        (test it)
    npm run dist     (builds dist\Skhtor-Admin-1.0.0-portable.exe and an installer)
Or push to GitHub and run the "Build Windows EXE" workflow, then download the artifact.

Notes: orders arrive live while the app is open. It plays order_alert.wav on every new order and
keeps the shop "open" heartbeat running. Closing the app = no alerts. Phone push (FCM) is not used on PC.

## Web push (alerts while Chrome is closed)
1. Firebase Console > Project settings > Cloud Messaging > Web Push certificates > Generate key pair. Copy the key.
2. Paste it into `const VAPID_KEY=""` near the top of `www/index.html`.
3. Replace `functions/index.js` in your backend repo with the provided `functions-index.js`, push, and run "Deploy Firebase backend".
4. Open the app in Chrome (run-in-chrome.bat), sign in, click Allow on the notification prompt.
Chrome must be running (it stays in the background on Windows by default). The EXE (Electron) cannot receive web push – use Chrome for closed-app alerts.
