export default interface AbstractCheck {
    validate(...args: any): Promise<boolean>;
}
