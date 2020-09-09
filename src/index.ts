import * as path from "path";

import {createConnection} from "typeorm";
import {Book} from "./entity/book";
import {Author} from "./entity/author";


createConnection({
  type: "sqlite",
  database: path.join(__dirname, "data.sqlite"),
  entities: [ Book, Author ],
  logging: true,
  synchronize: true,
}).then(async connection => {

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

}).catch(error => console.log("Error: ", error));