#! bash

# run the dev server
up:
	docker-compose -f server/docker/compose.yml -p teklil up $(args)

# run the dev server
rebuild_server:
	docker-compose -f server/docker/compose.yml -p teklil up -d --build app_server
