@echo off

START "" /b npm update -g npm

:NPM_UPDATE_CHECK
tasklist | find /i "node" >nul 2>&1
IF ERRORLEVEL 1 (  
  GOTO NPM_INSTALL
) ELSE (   
  GOTO NPM_UPDATE_CHECK
)

:NPM_INSTALL
START "" /b npm install

:NPM_INSTALL_CHECK
tasklist | find /i "node" >nul 2>&1
IF ERRORLEVEL 1 (  
  GOTO GRUNT_RELEASE
) ELSE (  
  GOTO NPM_INSTALL_CHECK
)

:GRUNT_RELEASE
START "" /b grunt --force release:0.1.0:../applications/bma/minifierAppSetup.json