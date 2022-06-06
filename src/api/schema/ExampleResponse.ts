import Response from './Response';

export default interface ExampleResponse extends Response {
    error: boolean;
    message: string;
}