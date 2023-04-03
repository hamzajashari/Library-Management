import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Book } from 'src/app/demo/api/book/Book';
import { BookService } from 'src/app/demo/service/book.service';
import { CartService } from 'src/app/demo/service/cart.service';
import {Router} from '@angular/router';
import { WishService } from 'src/app/demo/service/wish.service';
@Component({
    templateUrl: './list.component.html',
    providers: [MessageService],
})

export class ListComponent implements OnInit {

    currentUser = {};

    books: Book[];

    sortOptions: SelectItem[];

    sortOrder: number = 0;

    sortField: string = '';

    constructor(private wishService: WishService,private router: Router,private bookService: BookService,private cartService: CartService,private messageService: MessageService) { }

    ngOnInit() {

        
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');

        this.bookService.getAll().subscribe(res => {
            this.books = res;
          });


        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
    
    changeSource(event) {      
        event.target.src = "assets/demo/images/product/noimage.jpg";
    }

    addBookToCart(bookId: number){
        this.cartService.post(bookId).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book is added to cart', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be added to cart', life: 3000 });
            }     
          )};
    
    addBookToWish(bookId: number){
        this.wishService.post(bookId).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book is added to wish', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be added to wish', life: 3000 });
            }     
          )};


          bookDetail(bookId:number){
            this.router.navigate(['/pages/book-detail',bookId]);
          }
         
    }
