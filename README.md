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

## How to start

1. Istall dependencies with `npm install`.
2. Configure your database connection by tweaking your config file and `db/dbconnection.ts`. If you don't want any db connection, remove the following files and lines:
    - src/db (all the folder).
    - On app.ts, remove the lines specified on comments (this --> `await dbconnection.createConnection();`).
3. Configure you routes:
      - Create your route controller in `src/api/controller` (look at the examples in the folder).
      - Create your router in `src/api/routes` (look at the examples in the folder).
      - Add the router to the express app in `src/api/server.ts` (look at the examples lines in the file).
4. To test your application locally: `npm run start:dev`. 

## Scripts

- `npm run build`: builds the app. The result files will be places in the `dist` folder.
- `npm start`: starts the previous built in `dist`.
- `npm run start:dev`: starts the app by executing the Typescript files directly. It also reload the app when you make a change in the code.
- `npm run test`: the script exists, but it only gives an error. In the future I mitght provide some test examples.

## Logs

This microservice has a very cool log system. It shows two different logs:
- Access logs: prints a line for each api request.
- Normal log: it prints everything you send to the log.

The logs will be shown in the console as in the log files. There are two log files: one for access logs and another for everything.

### Log colors

You can set colors in your logs (only seen in the console not in the files) thanks to [colors](https://www.npmjs.com/package/colors). This is because my IDE removes the import lines I don't use.

Here you have an example of how to put colors in the logs:

```
import * as colors from 'colors';

log.info('Hello world!'.green);
```

### Log namespace

This microservice uses winston to manage logs so you can specify a name that will be printed in the log trace. Is very useful to know what file is printing the log.

Here is an example of how to use it:

```
import { logger } from './lib/logger' // set the correct route for your file

const log = logger.child({name: 'my_file.ts'}); // you can specify any name you want. I like to set the file name

log.info('Hello world!');
```

That will output:

```
2021-08-14 04:23:22+00:00 [info]  [my_file.ts] Hello world!
```