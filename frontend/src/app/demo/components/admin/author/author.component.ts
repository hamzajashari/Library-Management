import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthorService }from 'src/app/demo/service/author.service';
import { Author } from 'src/app/demo/api/author/Author';
@Component({
    templateUrl: './author.component.html',
    providers: [MessageService]
})
export class AuthorComponent implements OnInit {

    authorDialog: boolean = false;

    deleteAuthorDialog: boolean = false;

    deleteAuthorsDialog: boolean = false;

    authors: Author[] = [];

    author: Author = {
        id: 0,
        code: '',
        name: '',
        surname: '',
        email: '',
        description: '',
    };

    selectedAuthors: Author[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private authorservice: AuthorService, private messageService: MessageService) { }

    ngOnInit() {
        this.authorservice.getAll().subscribe(res => {
            this.authors = res;
          });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'author', header: 'Author' },
            { field: 'name', header: 'Name' },
            { field: 'surname', header: 'Surname' },
            { field: 'email', header: 'Email' },
            { field: 'description', header: 'Description' }
        ];
    }

    openNew() {
        this.author= {
            id: 0,
            code: '',
            name: '',
            surname: '',
            email: '',
            description: '',
        };
        this.submitted = false;
        this.authorDialog = true;
    }

    deleteSelectedAuthors() {
        this.deleteAuthorsDialog = true;
    }

    editAuthor(author: any) {
        this.author = { ...author };
        this.authorDialog = true;
    }

    deleteAuthor(author: any) {
        this.deleteAuthorDialog = true;
        this.author = { ...author };
    }
    //TODO
    confirmDeleteSelected() {
        this.deleteAuthorsDialog = false;
        this.authors = this.authors.filter(val => !this.selectedAuthors.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Authors Deleted', life: 3000 });
        this.selectedAuthors = [];
    }

    confirmDelete() {
        this.deleteAuthorDialog = false;
        this.authors = this.authors.filter(val => val.id !== this.author.id);
        this.authorservice.delete(this.author.id).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author Deleted', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Author cannot be deleted', life: 3000 });
            }
          );
        this.author= {
            id: 0,
            code: '',
            name: '',
            surname: '',
            email: '',
            description: ''
        };
    }

    hideDialog() {
        this.authorDialog = false;
        this.submitted = true;
    }


    saveAuthor() {
        this.submitted = true;
        if (this.author.name?.trim()) {
            if (this.author.id) {
                // @ts-ignore
                this.authors[this.findIndexById(this.author.id)] = this.author;
                //updating the author
                this.authorservice.put(this.author.id,this.author).subscribe(
                    res=>{
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author Updated', life: 3000 });
                        this.ngOnInit();
                    },
                    error =>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Author cannot be deleted', life: 3000 });
                    }
                  );
            } else {
                this.author.code = this.createId();
                this.authors.push(this.author);
                this.authorservice.post(this.author).subscribe(
                    res=>{
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author created', life: 3000 });
                        this.ngOnInit();
                    },
                    error =>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Author cannot be created', life: 3000 });
                    }
                  );
            }

            this.authors = [...this.authors];
            this.authorDialog = false;
            this.author = {
                id: 0,
                code: '',
                name: '',
                surname: '',
                email: '',
                description: '',
            };
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i]['code'] === id) {
                index = i;
                break;
            }
        }

        return index;
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
}
