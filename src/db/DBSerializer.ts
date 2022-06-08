import DBEntity from './entities/DBEntity';

export default abstract class DBSerializer {
    public abstract serialize(): DBEntity;

    public abstract deserialize(dbResult: DBEntity): this;

    public deserializeList<T>(dbResult: DBEntity[]): this[] {
      return dbResult.map(this.deserialize);
    }
}
