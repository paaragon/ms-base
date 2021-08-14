# ms-base

## Description

This is an example microservice which can be used as code base for any Typescript microservice.

## Features

- Well organised file structure
- Configuration by environment
- Custom logs with:
    - Id per request (awesome to follow requests logs)
    - Namespaces
    - Date
    - Level
    - Message
    - Other cool stuff (like a table in logs with all your endpoints)
- Access logs
- Request params validation
- DB Connection with TypeORM
- Basic authentication middleware (eaily rewritable to other authentication types)
- Custom error handler
- Debug configuration for VS Code
- NPM scrips to live reload and build

# How to start

1. Istall dependencies with `npm install`.
2. Configure your database connection by tweaking your config file and `db/dbconnection.ts`. If you don't want any db connection, remove the following files and lines:
    - src/db (all the folder).
    - On app.ts, remove the lines specified on comments (this --> `await dbconnection.createConnection();`).
3. Configure you routes:
      - Create your route controller in `src/api/controller` (look at the examples in the folder).
      - Create your router in `src/api/routes` (look at the examples in the folder).
      - Add the router to the express app in `src/api/server.ts` (look at the examples lines in the file).
4. To test your application locally: `npm run start:dev`. 

# Scripts

- `npm run build`: builds the app. The result files will be places in the `dist` folder.
- `npm start`: starts the previous built in `dist`.
- `npm run start:dev`: starts the app by executing the Typescript files directly. It also reload the app when you make a change in the code.
- `npm run test`: the script exists, but it only gives an error. In the future I mitght provide some test examples.