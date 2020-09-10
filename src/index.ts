import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import {Container} from "typedi";
import * as path from "path";
import {createConnection, useContainer, Connection} from "typeorm";
import * as TypeGraphQL from "type-graphql";

import {BookResolver} from "./entity/resolvers/book-resolver";
import {AuthorResolver} from "./entity/resolvers/author-resolver";
import {Book} from "./entity/book";
import {Author} from "./entity/author";

useContainer(Container);

start();

async function seed(connection: Connection) {
  const author1 = new Author();
  author1.name = "Jack London";
  await connection.manager.save(author1);

  const author2 = new Author();
  author2.name = "Mark Twain";
  await connection.manager.save(author2);

  const book1 = new Book();
  book1.name = "First book";
  book1.pageCount = 100;
  book1.author = author1;

  await connection.manager.save(book1);

  const book2 = new Book();
  book2.name = "Second book";
  book2.pageCount = 120;
  book2.author = author1;

  await connection.manager.save(book2);

  const books = [book1, book2];

  console.log("Books: ", books);
}

async function start() {
  try {
    const connection = await createConnection({
      type: "sqlite",
      database: path.join(__dirname, "data.sqlite"),
      entities: [ Book, Author ],
      logging: true,
      synchronize: true,
    });

    await seed(connection);

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [BookResolver, AuthorResolver],
      container: Container,
    });

    // Create GraphQL server
    const server = new ApolloServer({schema});

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);

  } catch (err) {
    console.error(err);
  }
}
