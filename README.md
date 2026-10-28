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
