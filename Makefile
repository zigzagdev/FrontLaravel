php container up:
	docker compose up -d

php container:
    docker compose exec app php bash
	app php artisan key:generate

php container stop:
	docker compose down

mysql up:
    docker compose exec db bash

phpmyadmin up:
    docker compose exec phpmyadmin bash

ps:
    docker compose ps