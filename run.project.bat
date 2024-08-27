@ECHO OFF
echo Please stand by, this may take some time...

docker-compose up --build --force-recreate

echo Docker finished, press any key to exit.

pause > nul
