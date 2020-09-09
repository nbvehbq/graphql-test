import { InputType, Field, Int, ID } from "type-graphql";

import { Book } from "../../book";

@InputType()
export class BookInput implements Partial<Book> {

  @Field(() => ID)
  bookId!: number;

  @Field()
  name!: string;

  @Field(() => Int)
  pageCount!: number;

}