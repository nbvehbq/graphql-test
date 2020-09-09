import { ObjectType, Field, ID, Int } from "type-graphql";
import {Column, Entity, RelationId, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Author} from "./author";

@ObjectType()
@Entity()
export class Book {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  bookId!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => Int)
  @Column()
  pageCount!: number;

  @Field(() => Author)
  @ManyToOne(() => Author)
  // @JoinTable()
  author!: Author;
  @RelationId((book: Book) => book.author)
  authorId!: number;

}