import ejs from "ejs";
import fs from 'fs';
import { logger } from '../../logger';
import { CustomExpress, Endpoint } from "../customExpress";
import SwaggerInternalConfig, { SwaggerPath } from "./swagger-internal-config";
import SwaggerConfig from "./swagger-user-config";

const log = logger.child({ name: 'swagger-builder.ts' });

export default {
    build(expressApp: CustomExpress, config: SwaggerConfig) {
        const internalConfig: SwaggerInternalConfig = buildInternalConfig(config, expressApp.endpoints);
        const tpl = fs.readFileSync(`${__dirname}/swagger-template.ejs`).toString();
        try {
            const swagger = ejs.render(tpl, { config: internalConfig });
            fs.writeFileSync(`${__dirname}/swagger.yml`, swagger);
        } catch (e) {
            log.error('Error al construir documentación swagger');
            log.error(JSON.stringify(e));
            console.log(e);
        }
    }
}

function buildInternalConfig(config: SwaggerConfig, endpoints: Endpoint[]): SwaggerInternalConfig {
    return {
        general: config,
        paths: endpoints?.map(e => e as unknown as SwaggerPath),
    }
}