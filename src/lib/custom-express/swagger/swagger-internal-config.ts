import SwaggerConfig from "./swagger-user-config";
import { ApplicationMIMES, AudioMIMES, ImageMIMES, TextMIMES, VideoMIMES } from "./types/mime";

export default interface SwaggerInternalConfig {
    general: SwaggerConfig,
    paths: SwaggerPath[];
}

export interface SwaggerPath {
    path: string;
    methods: SwaggerPathMethod[]
}

interface SwaggerPathMethod {
    type: 'GET' | 'POST' | 'DELETE' | 'PATCH';
    summary: string;
    consumes: SwaggerConsumes;
    produces: SwaggerProduces;
    parameters: SwaggerParameter[];
    responses: SwaggerResponse[];
}

interface SwaggerParameter {

}


interface SwaggerResponse {

}

type SwaggerConsumes = TextMIMES | ImageMIMES | AudioMIMES | VideoMIMES | ApplicationMIMES;
type SwaggerProduces = TextMIMES | ImageMIMES | AudioMIMES | VideoMIMES | ApplicationMIMES;