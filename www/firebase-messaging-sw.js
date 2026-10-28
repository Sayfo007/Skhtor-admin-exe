/* Receives order pushes while the page is closed (Chrome / Edge). */
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyA-_Q8X7jWa3psD6S-z9uyNIeZexnDfYto",
  authDomain: "skhtor-904cc.firebaseapp.com",
  projectId: "skhtor-904cc",
  storageBucket: "skhtor-904cc.firebasestorage.app",
  messagingSenderId: "448107128015",
  appId: "1:448107128015:web:a1323941c42335c03a43ba"
});
// Initialising messaging makes the SDK show the notification sent by the Cloud Function.
firebase.messaging();
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({type: "window", includeUncontrolled: true}).then((list) => {
    for (const c of list) { if ("focus" in c) return c.focus(); }
    return clients.openWindow("/");
  }));
});
