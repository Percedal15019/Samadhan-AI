@echo off
echo ===================================================
echo     Starting Samadhan AI Resolution Hub Servers
echo ===================================================

echo.
echo [1/2] Launching FastAPI Backend...
start cmd /k "cd backend && uvicorn app:app --reload"

echo [2/2] Launching React Frontend...
start cmd /k "cd frontend_web && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo Once the Vite server is ready, navigate to http://localhost:5173 
echo in your browser to view the application.
echo.
pause
