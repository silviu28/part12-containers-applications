# start frontend container with published port
docker run -p 5173:5173 -v "$(pwd):/usr/src/app/" hello-front-dev