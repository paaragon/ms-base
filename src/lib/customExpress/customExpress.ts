import Table from 'cli-table';
import express from 'express';
import * as core from 'express-serve-static-core';

export default function (config?: CustomExpressConfig): CustomExpress {
    const customApp: CustomExpress = express() as CustomExpress;
    customApp.config = {
        // tslint:disable-next-line
        log: config?.log || console.log,
    }
    customApp.use = attatchEndpointsLogger(customApp, customApp.use);
    customApp.printEndpoints = printEndpoints;

    return customApp;
}

export interface CustomExpress extends core.Express {
    endpoints: Endpoint[];
    printEndpoints: () => void,
    config: CustomExpressConfig;
};

export type Endpoint = { method: string, path: string };

export interface CustomExpressConfig {
    log: (message: string) => void;
}

function attatchEndpointsLogger(topApp: CustomExpress, fn: Function) {
    return function withLogic(this: any) {
        const res = fn.apply(this, arguments);
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

function printEndpoints(this: CustomExpress) {
    if (!this.endpoints) {
        return;
    }

    let maxEndpointLength = 0;
    const maxMethodLength = 8;
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
    this.config.log(`Application endpoints:\n${table.toString()}`);
}