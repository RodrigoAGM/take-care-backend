# Take Care Backend

Backend developed with Nodejs using typescript and MySql database

## Requirements

- Node 10.x
- Docker (Optional)

## Setup local enviroment

- Create a `.env` file following the `example.env` structure.
- Check if Docker is running.
- Run the `make up-container` command.

## Features

- Jwt authentication for security
- Roles for permissions on different routes on app
- Async requests based on promises using mysql2 npm package
- Project correctly organized using models, interfaces, services, controllers and routes.
