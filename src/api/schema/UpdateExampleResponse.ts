import Response from './Response';

export default interface UpdateExampleResponse extends Response {
    error: boolean;
    result: any;
}