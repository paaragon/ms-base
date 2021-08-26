type semanticVersion = `${number}.${number}.${number}`;
type scheme = 'http' | 'https';

export default interface SwaggerConfig {
    name: string;
    description?: string;
    version: semanticVersion;
    host?: string;
    basePath: string;
    schemes: scheme[];
}