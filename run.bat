@echo off
setlocal

REM Check if node_modules directory exists
if not exist "node_modules" (
    echo node_modules directory not found. Running npm ci...
    npm ci
    REM Run node index.js
    echo Running node index.js...
    node --no-warnings index.js

    endlocal
) else ( REM Run node index.js
echo Running node index.js...
node --no-warnings index.js

endlocal )


