import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/demo/service/user.service';
import { User } from '../../api/user-detail/User';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
    templateUrl: './settings.component.html',
    providers: [ConfirmationService,MessageService],
})
export class SettingsComponent implements OnInit{
    currentUser = {};
    error = '';
    username = '';
    user = new User();
    message: string | undefined;
    UserUpdateForm: FormGroup;
    showModal = false ;
    displayResponsive: boolean;
    PasswordUpdateForm: FormGroup;
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
                private location: Location,
                private userService: UserService,
                private router: Router,
                private formBuilder: FormBuilder) { }
  
    ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
      this.loadUserDetail();
      this.loadUserUpdateForm();
    }
  
    loadUserDetail() {
      this.userService.getByName(this.currentUser['username']).subscribe(
        res => {
          this.user = res;
          this.loadUserUpdateForm();
        },
        error => {
          this.LoadBackPage();
        }
      );
  
    }
  
    loadUserUpdateForm(){
      this.UserUpdateForm = this.formBuilder.group({
      'username':       [this.user.username, [Validators.required]],
      'firstname':      [this.user.firstname ],
      'lastname':       [this.user.lastname],
      'email':          [this.user.email],
      'address':        [this.user.address ],
      'city':           [this.user.city],
      'state':          [this.user.state],
      'zip':            [this.user.zip],
      'about':          [this.user.about],
      'university':     [this.user.university],
      'facebook':       [this.user.facebook],
      'instagram':      [this.user.instagram],
      'twitter':        [this.user.twitter],
      });
    }
  
    updateUser(){
      if (!this.UserUpdateForm.valid) {
        return;
      }
      this.userService.put(this.user.username, this.UserUpdateForm.value).subscribe(
        res => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Update is completed', life: 3000 });
          this.router.navigate(['/']);
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Update had an error', life: 3000 });
          this.message = error;
        }
      );
    }
    get uf() { return this.UserUpdateForm.controls; }
  
    LoadBackPage() {
      this.location.back();
    }
  
    goToLink(url: string){
      window.open(url);
  }
  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.updateUser();
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 2000});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled', life: 2000});
                break;
            }
        }
    });
}
}
