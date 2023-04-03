import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Book } from 'src/app/demo/api/book/Book';
import { BookService } from 'src/app/demo/service/book.service';
import { AuthorService } from 'src/app/demo/service/author.service';
import { PublisherService } from 'src/app/demo/service/publisher.service';
import { Author } from 'src/app/demo/api/author/Author';
import { Publisher } from 'src/app/demo/api/publisher/Publisher';
import { Router } from '@angular/router';
@Component({
    templateUrl: './book.component.html',
    providers: [MessageService]
})
export class BookComponent implements OnInit {

    bookDialog: boolean = false;

    deleteBookDialog: boolean = false;

    deleteBooksDialog: boolean = false;

    books: Book[] = [];

    author: Author;

    authors: Author[];

    publisher: Publisher;

    publishers: Publisher[];

    book: Book = {
        id: 0,
        code: "",
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "",
        image: "",
        rating: 0,
        publisherId: 0,
        authorId: 0,
        selectedQuantity: 1
    };

    selectedBooks: Book[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private router: Router,private bookService: BookService,private authorService: AuthorService,private publisherService: PublisherService, private messageService: MessageService) { }

    ngOnInit() {
        this.bookService.getAll().subscribe(res => {
            this.books = res;
          });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'price', header: 'Price' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'image', header: 'Image' },
            { field: 'rating', header: 'Rating' },
            { field: 'author', header: 'Author' },
            { field: 'publisher', header: 'Publisher' },
        ];
    }

    openNew() {
        this.book= {
            id: 0,
            code: "",
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            category: "",
            image: "",
            rating: 0,
            publisherId: 0,
            authorId: 0,
            selectedQuantity: 1
        };
        this.submitted = false;
        this.bookDialog = true;
    }

    deleteSelectedBooks() {
        this.deleteBooksDialog = true;
    }

    editBook(book: any) {
        this.book = { ...book };
        this.bookDialog = true;
    }

    deleteBook(book: any) {
        this.deleteBookDialog = true;
        this.book = { ...book };
    }

    confirmDeleteSelected() {
        this.deleteBooksDialog = false;
        this.books = this.books.filter(val => !this.selectedBooks.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Books Deleted', life: 3000 });
        this.selectedBooks = [];
    }

    confirmDelete() {
        this.deleteBookDialog = false;
        this.books = this.books.filter(val => val.id !== this.book.id);
        this.bookService.delete(this.book.id).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Deleted', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be deleted', life: 3000 });
            }
          );
        this.book= {
            id: 0,
            code: "",
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            category: "",
            image: "",
            rating: 0,
            publisherId: 0,
            authorId: 0,
            selectedQuantity: 1
        };
    }

    hideDialog() {
        this.bookDialog = false;
        this.submitted = false;
    }

    saveBook() {
        this.submitted = true;
       
        if (this.book.name?.trim()) {

            this.book.authorId=this.author.id;
            this.book.publisherId=this.publisher.id;

            this.insertInventory(this.book.quantity);
            if (this.book.id) {
                
                // @ts-ignore
                this.books[this.findIndexById(this.book.id)] = this.book;
                 this.bookService.put(this.book.id,this.book).subscribe(
                    res=>{
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Updated', life: 3000 });
                        this.ngOnInit();
                    },
                    error =>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be updated', life: 3000 });
                    })
            } else {
                this.book.code = this.createId();
                this.books.push(this.book);
                this.bookService.post(this.book).subscribe(
                    res=>{
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book created', life: 3000 });
                        this.ngOnInit();
                    },
                    error =>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be created', life: 3000 });
                    }
                  );
            }

            this.books = [...this.books];
            this.bookDialog = false;
            this.author = new Author;
            this.publisher = new Publisher;
            this.book = {
                id: 0,
                code: "",
                name: "",
                description: "",
                price: 0,
                quantity: 0,
                category: "",
                image: "",
                rating: 0,
                publisherId: 0,
                authorId: 0,
                selectedQuantity: 1
            };
            this.ngOnInit();
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i]['code'] === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    
    changeSource(event) {      
        event.target.src = "assets/demo/images/product/noimage.jpg";
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    listAuthors(event) {
        this.authorService.findAllByName(event.query).subscribe(data => {
            this.authors = data;
        });
    }
    listPublishers(event) {
        this.publisherService.findAllByName(event.query).subscribe(data => {
            this.publishers = data;
        });
    }
    bookDetail(bookId:number){
        this.router.navigate(['/pages/book-detail',bookId]);
      }

    insertInventory(quantity: number)
    {
        if(quantity>25)

        this.book.inventoryStatus="INSTOCK";

        else if(quantity>1){

        this.book.inventoryStatus="LOWSTOCK";
        }
        else
        this.book.inventoryStatus="OUTOFSTOCK";
    }
}
