import Table from 'cli-table';
import express from 'express';
import * as core from 'express-serve-static-core';
import { logger } from '../logger';
import swaggerBuilder from './swagger/swagger-builder';
import SwaggerConfig from './swagger/swagger-user-config';

const log = logger.child({ name: 'server.ts' });

export type Endpoint = { method: string, path: string };

// this is just express but with fancy functionality
export interface CustomExpress extends core.Express {
    endpoints: Endpoint[];
    printEndpoints: () => void,
    swaggerConfig: (config: SwaggerConfig) => void,
};

export default function (): CustomExpress {
    
    const customApp: CustomExpress = express() as CustomExpress;
    customApp.printEndpoints = printEndpoints;
    customApp.use = attatchEndpointsLogger(customApp, customApp.use);
    customApp.swaggerConfig = (config: SwaggerConfig) => swaggerBuilder.build(customApp, config);

    return customApp;
}

function attatchEndpointsLogger(topApp: CustomExpress, fn: Function) {
    return function withLogic(this: any) {
        var res = fn.apply(this, arguments);
        for (const arg of Array.from(arguments)) {
            if (typeof arg === 'function' && arg.name === 'app') {
                topApp.endpoints = [...topApp.endpoints || [], ...getEndpoints(arg)];
            }
        }
        return res;
    };
}


function getEndpoints(app: core.Express): Endpoint[] {
    const appPaths: { methods: string[], path: string }[] = app._router.stack
        .filter((s: any) => s.name === 'bound dispatch')
        .map((s: any) => s.route)
        .map((r: any) => ({ methods: Object.keys(r.methods).filter((m: any) => m), path: r.path }));

    const ret: Endpoint[] = [];
    for (const appPath of appPaths) {
        for (const method of appPath.methods) {
            ret.push({ method: method.toUpperCase(), path: `${app.path()}${appPath.path}` });
        }
    }
    return ret;
}

function printEndpoints(this: any) {
    log.info('Application endpoints');
    if (!this.endpoints) {
        return;
    }

    let maxEndpointLength = 0;
    let maxMethodLength = 8;
    const rows = []
    for (const endpoint of this.endpoints) {
        rows.push([endpoint.method, endpoint.path]);
        if (endpoint.path.length > maxEndpointLength) {
            maxEndpointLength = endpoint.path.length;
        }
        if (endpoint.method.length > maxEndpointLength) {
            maxEndpointLength = endpoint.method.length;
        }
    }

    const table = new Table({
        head: ['Method', 'Path'],
        colWidths: [maxMethodLength, maxEndpointLength + 2],
    });

    table.push(...rows);
    log.info(`\n${table.toString()}`);
}