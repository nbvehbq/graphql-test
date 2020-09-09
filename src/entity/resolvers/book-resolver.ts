import {Resolver, Arg, Query, Int, Mutation, FieldResolver, Root} from "type-graphql";
import {Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";

import {Author} from "../author";
import {Book} from "../book";
import {BookInput} from "./types/book-input";

@Resolver(() => Book)
export class BookResolver {
  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  @Query(() => Book, {nullable: true})
  book(@Arg("bookId", () => Int) bookId: number) {
    return this.bookRepository.findOne(bookId);
  }

  @Query(() => [Book])
  books(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  @Mutation(() => Book)
  async addBook(@Arg("book") bookInput: BookInput): Promise<Book> {
    const book = this.bookRepository.create({...bookInput});

    return await this.bookRepository.save(book);
  }

  @FieldResolver()
  async author(@Root() book: Book): Promise<Author> {
    return (await this.authorRepository.findOne(book.authorId, { cache: 1000 }))!;
  }

}