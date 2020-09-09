import { ObjectType, Field, ID } from "type-graphql";
import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@ObjectType()
@Entity()
export class Author {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  authorId!: number;

  @Field()
  @Column()
  name!: string;

}