##You can run this project using docker

1 - Go to UI folder and install `npm i @angular/cli`, after that `run npm install` so `npm run build`

2 - Go to API\FORECAST folder and run `dotnet publish -c Release -o build`

3 - Go to root folder and run ` docker-compose up -d`

4 - After docker build the containers you can open your browser and go to `http://localhost` to check the system.