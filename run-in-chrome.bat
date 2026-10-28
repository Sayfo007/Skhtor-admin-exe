@echo off
REM Runs Skhtor Admin in its own Chrome window. Needs Node.js installed.
cd /d "%~dp0"
start "Skhtor server" /min cmd /c "npx --yes serve www -l 5173"
timeout /t 4 >nul
start chrome --app=http://localhost:5173
