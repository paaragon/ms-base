import config from 'config';
import cors from 'cors';
import express from 'express';
import httpContext from 'express-http-context';
import fs from 'fs';
import * as yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import customExpress, { CustomExpress } from '../lib/customExpress/customExpress';
import { logger } from '../logger/logger';
import { ConfigApiI } from '../models/ConfigI';
import accessLogger from './mdw/accessLogger';
import errorHandler from './mdw/errorHandler';
import requestUuid from './mdw/requestUuid';
import exampleRoutes from './routes/example.routes';
import exampledbRoutes from './routes/exampledb.routes';

const log = logger.child({ name: 'server.ts' });

export default class Server {
    private app: CustomExpress;

    constructor(
        public port: number,
    ) {
        const customExpressLog = log.child({ name: 'customExpress' });
        this.app = customExpress({
            log: customExpressLog.info.bind(customExpressLog),
        });
        this.app.use(cors({
            origin: true,
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(httpContext.middleware);
        this.app.use(requestUuid);
        this.app.use(accessLogger);
        this.initSwaggerRoutes();
        this.initRoutes();
        this.app.use(errorHandler);
    }

    private initRoutes() {
        this.app.use(`/api/v${config.get<ConfigApiI>('api').version}/example`, exampleRoutes);
        this.app.use(`/api/v${config.get<ConfigApiI>('api').version}/db/example`, exampledbRoutes);
        /** add your routes here (use the lines above as examples) */
    }

    private initSwaggerRoutes() {
        const openapiPath = `${__dirname}/../../docs/openapi.yaml`;
        const swagger = yaml.load(fs.readFileSync(openapiPath, { encoding: 'utf-8' }));
        this.app.use(`/openapi`, swaggerUi.serve, swaggerUi.setup(swagger));
        this.app.use(`/openapi.yaml`, express.static(openapiPath));
    }

    async start() {
        return new Promise<void>((res, rej) => {
            this.app.listen(this.port, () => {
                this.app.printEndpoints();
                log.info(`Server is listening on port ${this.port}`);
                res();
            });
        });
    }
}