# start frontend container with published port
docker run -p 5173:5173 -v "$(pwd):/usr/src/app/" hello-front-dev

# ???
docker compose  -f docker-compose.dev.yml run debug-helper wget -O - http://app:5173

# run frontend with port mapping
docker run -p 5001:3000 hello-front