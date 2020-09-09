import {Resolver, Arg, Query, Int, Mutation} from "type-graphql";
import {Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";

import {Author} from "../author";
import {AuthorInput} from "./types/author-input";

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>
  ) {}

  @Query(() => Author, {nullable: true})
  author(@Arg("autorId", () => Int) authorId: number) {
    return this.authorRepository.findOne(authorId);
  }

  @Query(() => [Author])
  authors(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  @Mutation(() => Author)
  async addAuthor(@Arg("author") authorInput: AuthorInput): Promise<Author> {
    const author = this.authorRepository.create({...authorInput});

    return await this.authorRepository.save(author);
  }

}