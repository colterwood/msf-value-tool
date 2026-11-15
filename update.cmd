@echo off
rem Update everything the page shows, in one go. Double-click this file.
rem   1. If the clipboard holds a store read (click the "MSF: grab my offers" bookmark on the
rem      store page first), save it to data\offers.js.
rem   2. Add the read to data\reads.json and rebuild the prices (data\values.js) and the price
rem      history (data\history.js) from your own reads.
rem Then reload index.html. Nothing leaves this computer.
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install it from https://nodejs.org or open a new terminal and try again.
  pause
  exit /b 1
)
node tools\save-store.js --clipboard --if-newer
if errorlevel 1 (
  echo.
  echo The read on the clipboard could not be saved. data\offers.js was left as it was.
  pause
  exit /b 1
)
node tools\refresh.js
if errorlevel 1 (
  echo.
  echo The rebuild did not finish, so the values were left as they were. The message above says what went wrong.
  pause
  exit /b 1
)
echo.
echo Done. Reload index.html in your browser.
pause
