@echo off
setlocal

echo === 1. Push du code source sur la branche main (Railway) ===
git add -A
git commit -m "deploy: update main %date% %time%"
git push origin main

echo === 2. Build de production ===
call npm run build
if %errorlevel% neq 0 (
    echo Erreur lors du build!
    exit /b 1
)

echo === 3. Deploiement sur gh-pages (GitHub Pages) ===
cd dist
if exist .git rmdir /s /q .git
git init
git config http.sslBackend openssl
git config user.email "dovaphonedz@gmail.com"
git config user.name "Dovakin"
git checkout -b gh-pages
git add -A
git commit -m "deploy: update gh-pages %date% %time%"

git remote add origin https://github.com/dovaphonedz-jpg/mon-cv-go.git
git push origin gh-pages --force

cd ..

echo === Deploiement termine! ===
endlocal
