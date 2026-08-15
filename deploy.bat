@echo off
setlocal

echo === Build de production ===
call npm run build
if %errorlevel% neq 0 (
    echo Erreur lors du build!
    exit /b 1
)

echo === Deploiement manuel sur gh-pages ===

:: Aller dans le dossier dist
cd dist

:: Init git dans dist
if exist .git rmdir /s /q .git
git init
git config http.sslBackend openssl
git config user.email "dovaphonedz@gmail.com"
git config user.name "Dovakin"
git checkout -b gh-pages
git add -A
git commit -m "deploy: update gh-pages %date% %time%"

:: Push force sur la branche gh-pages
git remote add origin https://github.com/dovaphonedz-jpg/mon-cv-go.git 2>nul || git remote set-url origin https://github.com/dovaphonedz-jpg/mon-cv-go.git
git push origin gh-pages --force

cd ..

echo === Deploiement termine! ===
endlocal
