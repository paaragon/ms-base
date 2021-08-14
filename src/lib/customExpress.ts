import Table from 'cli-table';
import * as core from 'express-serve-static-core';
import { logger } from '../lib/logger';

const log = logger.child({ name: 'server.ts' });

type Endpoint = { method: string, path: string };

// this is just express but with printEndpoints function
export interface CustomExpress extends core.Express {
    printEndpoints: Function
};

export default function (app: core.Express): CustomExpress {
    const customApp: CustomExpress = app as CustomExpress;
    customApp.printEndpoints = printEndpoints;
    customApp.use = attatchEndpointsLogger(customApp, customApp.use);

    return customApp;
}

function attatchEndpointsLogger(topApp: any, fn: Function) {
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