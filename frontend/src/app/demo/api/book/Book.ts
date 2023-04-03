import { Author } from "../author/Author";
import { CommentBook } from "../comment/CommentBook";
import { Publisher } from "../publisher/Publisher";

  export class Book {
    id!: number;
    code: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    inventoryStatus?: string;
    category: string;
    image: string;
    rating: number;
    publisherId: number;
    authorId: number;
    publisher?: Publisher;
    author?: Author;
    selectedQuantity: number;
    comments?: CommentBook[];

    constructor(){} 
 }




  
