import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class Author {

  @PrimaryGeneratedColumn()
  authorId!: number;

  @Column()
  name!: string;

}