import { Book } from "../book/Book";

export class Wish {
    id!: number;
    dateCreated: string;
    bookList: Book[];
  }