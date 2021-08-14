import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('EXAMPLE')
export default class ExampleDB {
    @PrimaryGeneratedColumn({ name: 'ID' })
    id?: number;

    @Column({ name: 'NAME' })
    name: string;

    @Column({ name: 'LAST_NAME' })
    lastName: string;

    @Column({ name: 'DATE' })
    date: Date;
}