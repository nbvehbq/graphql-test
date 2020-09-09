import { InputType, Field, ID } from "type-graphql";

@InputType()
export class AuthorInput {

  @Field(() => ID)
  authorId!: number;

  @Field()
  name!: string;

}
