import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PublisherService }from 'src/app/demo/service/publisher.service';
import { Publisher } from 'src/app/demo/api/publisher/Publisher';
@Component({
    templateUrl: './publisher.component.html',
    providers: [MessageService]
})
export class PublisherComponent implements OnInit {

    publisherDialog: boolean = false;

    deletePublisherDialog: boolean = false;

    deletePublishersDialog: boolean = false;

    publishers: Publisher[] = [];

    publisher: Publisher = {
        id: 0,
        code: '',
        name: '',
        surname: '',
        email: '',
        description: '',
    };

    selectedPublishers: Publisher[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private publisherService: PublisherService, private messageService: MessageService) { }

    ngOnInit() {
        this.publisherService.getAll().subscribe(res => {
            this.publishers = res;
          });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'publisher', header: 'Publisher' },
            { field: 'name', header: 'Name' },
            { field: 'surname', header: 'Surname' },
            { field: 'email', header: 'Email' },
            { field: 'description', header: 'Description' }
        ];
    }

    openNew() {
        this.publisher= {
            id: 0,
            code: '',
            name: '',
            surname: '',
            email: '',
            description: '',
        };
        this.submitted = false;
        this.publisherDialog = true;
    }

    deleteSelectedPublishers() {
        this.deletePublishersDialog = true;
    }

    editPublisher(publisher: any) {
        this.publisher = { ...publisher };
        this.publisherDialog = true;
    }

    deletePublisher(publisher: any) {
        this.deletePublisherDialog = true;
        this.publisher = { ...publisher };
    }
    //TODO
    confirmDeleteSelected() {
        this.deletePublishersDialog = false;
        this.publishers = this.publishers.filter(val => !this.selectedPublishers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Publishers Deleted', life: 3000 });
        this.selectedPublishers = [];
    }

    confirmDelete() {
        this.deletePublisherDialog = false;
        this.publishers = this.publishers.filter(val => val.id !== this.publisher.id);
        this.publisherService.delete(this.publisher.id).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Publisher Deleted', life: 3000 });
                
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Publisher cannot be deleted', life: 3000 });
            }
          );
        this.publisher= {
            id: 0,
            code: '',
            name: '',
            surname: '',
            email: '',
            description: ''
        };
    }

    hideDialog() {
        this.publisherDialog = false;
        this.submitted = true;
    }


    savePublisher() {
        this.submitted = true;
        if (this.publisher.name?.trim()) {
            if (this.publisher.id) {
                // @ts-ignore
                this.publishers[this.findIndexById(this.publisher.id)] = this.publisher;
                //updating the publisher
                this.publisherService.put(this.publisher.id,this.publisher).subscribe(
                    res=>{
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Publisher Updated', life: 3000 });
                        this.ngOnInit();
                    },
                    error =>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Publisher cannot be deleted', life: 3000 });
                    }
                  );
            } else {
                this.publisher.code = this.createId();
                this.publishers.push(this.publisher);
                this.publisherService.post(this.publisher).subscribe(
                    res=>{
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Publisher created', life: 3000 });
                        this.ngOnInit();
                    },
                    error =>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Publisher cannot be created', life: 3000 });
                    }
                  );
            }

            this.publishers = [...this.publishers];
            this.publisherDialog = false;
            this.publisher = {
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
        for (let i = 0; i < this.publishers.length; i++) {
            if (this.publishers[i]['code'] === id) {
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
