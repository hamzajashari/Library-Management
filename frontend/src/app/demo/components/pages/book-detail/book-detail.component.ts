import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Book } from '../../../api/book/Book';
import { BookService } from '../../../service/book.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/demo/service/cart.service';
import { Author, AuthorDto } from 'src/app/demo/api/author/Author';
import { AuthorService } from 'src/app/demo/service/author.service';
import { PublisherService } from 'src/app/demo/service/publisher.service';
import { CommentService } from 'src/app/demo/service/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentBook } from 'src/app/demo/api/comment/CommentBook';
import { AuthenticationService } from '../../security/authentication.service';
import { BookRec } from 'src/app/demo/api/book/BookRec';
import { WishService } from 'src/app/demo/service/wish.service';
@Component({
    templateUrl: './book-detail.component.html',
    providers: [MessageService]
})
export class BookDetailComponent implements OnInit {
    book: Book;
    author: AuthorDto;
    publisher: any;
    submitted = false;
    commentForm!: FormGroup;
    commentSent: CommentBook;

    comments: CommentBook[];

    recommended: BookRec[];
    
    responsiveOptions;

    bookId:string="";
    title: string="";
    content: string="";


    currentUser:{};
    userId: string="";
    username: string="";

    constructor(private cartService: CartService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private commentService: CommentService, 
        private bookService: BookService,
        private authorService: AuthorService,
        private publisherService: PublisherService,
        private auth: AuthenticationService,
        private router: Router,
        private wishService: WishService){}
    ngOnInit(): void {

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];

        this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
        this.username=this.currentUser['username'];
        this.commentSent= new CommentBook();
    
        this.bookId = this.route.snapshot.paramMap.get('id')!;

        this.bookService.getById(this.bookId).subscribe(
            res=>{
            this.book=res;
            this.authorService.getById(this.book.authorId).subscribe(
                    res=>{
                        this.author=res;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Details', life: 3000 });
                    },
                    error =>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be displayed', life: 3000 });
                    }
            );
            this.publisherService.getById(this.book.publisherId).subscribe(
                     res=>{
                         this.publisher=res;
                         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Details', life: 3000 });
                     },
                     error =>{
                         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be displayed', life: 3000 });
                     }
            );
            this.commentService.getAll(this.bookId).subscribe(
            res=>{
                this.comments=res;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Details', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be displayed', life: 3000 });
            }
            );

            this.bookService.getRec(this.bookId).subscribe(
                res=>{
                    this.recommended=res;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Details', life: 3000 });
                },
                error =>{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be displayed', life: 3000 });
                }
                );
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Details', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be displayed', life: 3000 });
            }
          );
       
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


    comment()
    {
        this.commentSent.username=this.username;
        this.commentSent.bookId=this.book.id;
        this.commentSent.dateCreated=new Date(Date.now());

        this.commentSent.dateCreated.getUTCDate();
        this.commentService.post(this.commentSent).subscribe(
            res=>{
                this.ngOnInit();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment is added', life: 3000 });
            },
            error=>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Comment cannot be added', life: 3000 });
            }
        )

    }

    changeSource(event) {      
    event.target.src = "assets/demo/images/product/noimage.jpg";
    }

    bookDetail(bookId:number){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/pages/book-detail',bookId]);
    }

    addBookToWish(bookId: number){
        this.wishService.post(bookId).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book is added to wish', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be added to wish', life: 3000 });
            }     
          )};

    deleteComment(commentId){
        this.commentService.delete(commentId).subscribe(
            res=>{
                this.ngOnInit();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment is added', life: 3000 });
            },
            error=>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Comment cannot be added', life: 3000 });
            }
        )
    }

    }
