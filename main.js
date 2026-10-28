const {app, BrowserWindow, Menu, powerSaveBlocker, shell} = require("electron");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Play the order alarm without needing a click first.
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

if (!app.requestSingleInstanceLock()) { app.quit(); }

const WWW = path.join(__dirname, "www");
const TYPES = {".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".wav": "audio/wav", ".json": "application/json"};

// Serve the app from http://127.0.0.1 (an authorized Firebase domain) instead of file://
function startServer() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let f = decodeURIComponent(req.url.split("?")[0]);
      if (f === "/") f = "/index.html";
      const full = path.normalize(path.join(WWW, f));
      if (!full.startsWith(WWW)) { res.writeHead(403); return res.end(); }
      fs.readFile(full, (err, data) => {
        if (err) { res.writeHead(404); return res.end("Not found"); }
        res.writeHead(200, {"Content-Type": TYPES[path.extname(full)] || "application/octet-stream"});
        res.end(data);
      });
    });
    srv.listen(47831, "127.0.0.1", () => resolve(47831));
    srv.on("error", () => srv.listen(0, "127.0.0.1", () => resolve(srv.address().port)));
  });
}

let win;
app.whenReady().then(async () => {
  Menu.setApplicationMenu(null);
  // Keep the PC from suspending so orders keep arriving
  powerSaveBlocker.start("prevent-app-suspension");
  const port = await startServer();
  win = new BrowserWindow({
    width: 480, height: 900, title: "Skhtor Admin", icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: {backgroundThrottling: false}, // timers keep running when minimized
  });
  win.setMenuBarVisibility(false);
  win.webContents.setWindowOpenHandler(({url}) => { shell.openExternal(url); return {action: "deny"}; });
  win.loadURL("http://127.0.0.1:" + port + "/");
});
app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.on("window-all-closed", () => app.quit());
