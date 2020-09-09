import {Column, Entity, JoinTable, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Author} from "./author";

@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  bookId!: number;

  @Column()
  name!: string;

  @Column("text")
  pageCount!: number;

  @ManyToOne(_type => Author)
  @JoinTable()
  author!: Author;

}