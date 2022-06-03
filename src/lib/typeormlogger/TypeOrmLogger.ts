import { Logger, QueryRunner } from "typeorm";
import { logger } from '../../logger/logger';

export class TypeOrmLogger implements Logger {
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        // logger.info(`Execute query: ${query} params: ${parameters}`);
        // logger.info(JSON.stringify(queryRunner.broadcaster.));
    }
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        logger.error(`Query error: ${error}`);
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        logger.info(`Execute query with parameters: ${parameters} - Execution time: ${time}ms`);
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        logger.info(message);
    }
    logMigration(message: string, queryRunner?: QueryRunner) {
        logger.info(message);
    }
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
        logger.info(message);
    }
}