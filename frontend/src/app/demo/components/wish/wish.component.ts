import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Book } from 'src/app/demo/api/book/Book';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Wish } from '../../api/wish/Wish';
import { WishService } from '../../service/wish.service';
@Component({
    templateUrl: './wish.component.html',
    providers: [MessageService]
})

export class WishComponent implements OnInit {

    currentUser = {};

    books: Book[];

    wish: Wish;

    sum: any = 0    ;

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    userId: string;

    cols: any[] = [];

    selectedBooks: Book[] = [];



    constructor(private router: Router, private messageService: MessageService, private wishService: WishService) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');

        this.wishService.getWish().subscribe(
            res=>{
                this.wish=res;
                this.books=this.wish.bookList;
                this.books.forEach(element => {
                    element.selectedQuantity=1;
                });
            },
        );
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];

        this.cols = [
            { field: 'book', header: 'Book' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'action', header: 'Description' },
        ];
    };
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    changeSource(event) {      
        event.target.src = "assets/demo/images/product/noimage.jpg";
    }



    deleteBookFromWish(bookId: number)
    {

        this.wishService.delete(this.wish.id,bookId).subscribe(
            res=>{
                this.ngOnInit();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Deleted', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be deleted', life: 3000 });
            }
          );
    }

    bookDetail(bookId:number){
        this.router.navigate(['/pages/book-detail',bookId]);
      }
      
    redirectToList(): void {
        this.router.navigateByUrl('/pages/list');
    }
}