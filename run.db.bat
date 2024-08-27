@ECHO OFF

echo Press any key to boot MongoDb in docker for local debugging, or exit now.

pause > nul

docker-compose -f GroceryStore.API/docker-compose.yml up

