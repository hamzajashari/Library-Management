import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/demo/service/user.service';
import { User } from '../../api/user-detail/User';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { map } from 'rxjs';
@Component({
    templateUrl: './changepassword.component.html',
    providers: [ConfirmationService,MessageService],
})
export class changepasswordComponent implements OnInit{
    currentUser = {};
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
      this.loadPasswordUpdateForm();
    }
  
    loadUserDetail() {
      this.userService.getByName(this.currentUser['username']).subscribe(
        res => {
          this.user = res;
        },
        error => {
          this.LoadBackPage();
        }
      );
  
    }
  
    loadPasswordUpdateForm(){
      this.PasswordUpdateForm = this.formBuilder.group({
        'username':       [null],
        'password':        [null, [Validators.required]],
        'newpassword':    [null, [Validators.required]],
        'newpassword2':    [null, [Validators.required]],
      });
    }
    updatePassword(){
      if (!this.PasswordUpdateForm.valid) {
        return;
      }
      if(this.PasswordUpdateForm.value['newpassword'] === this.PasswordUpdateForm.value['newpassword2']){
        this.PasswordUpdateForm.value['username'] =this.currentUser['username'];
        this.userService.changePassword(this.PasswordUpdateForm.value).subscribe(
          res => {
           
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your password has been updated.', life: 3000 });
        this.router.navigate(['/auth/login']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You entered your current password incorrectly.', life: 3000 });
      }
    }
  
    get pf() { return this.PasswordUpdateForm.controls; }
  
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
            this.updatePassword();
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
