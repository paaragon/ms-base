export default interface DBEntity {
    serialize(): any;
    deserialize(data: any): void;
}

