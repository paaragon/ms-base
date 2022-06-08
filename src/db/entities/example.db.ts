import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Example from '../../models/example.model';
import DBEntity from './DBEntity';

@Entity('EXAMPLE')
export default class ExampleDB implements DBEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
    id?: number;

  @Column({ name: 'NAME' })
    name: string;

  @Column({ name: 'LAST_NAME' })
    lastName: string;

  @Column({ name: 'DATE' })
    date: Date;

  @Column({ name: 'AVATAR' })
    avatar: string;

  deserialize(example: Example) {
    this.id = example.id;
    this.name = example.name;
    this.lastName = example.lastName;
    this.date = example.date;
    this.avatar = example.avatar;
  }

  serialize(): Example {
    const ret = new Example();
    ret.id = this.id;
    ret.name = this.name;
    ret.lastName = this.lastName;
    ret.date = this.date;
    ret.avatar = this.avatar;
    return ret;
  }
}
