import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Role } from '../demo/api/user-detail/User';
import { AuthenticationService } from '../demo/components/security/authentication.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    adminModel: any[] = [];
 
    admin: boolean=false;

    constructor(public layoutService: LayoutService,private auth: AuthenticationService) { }

    ngOnInit() {
        
        if(this.auth.hasUsername("hamzajashari")){
            this.admin=true;
            this.adminModel= [
                {
                    label: 'Admin', 
                    icon: 'pi pi-fw pi-verified',
                    items: [
                        { 
                            label: 'Dashboard', 
                            icon: 'pi pi-fw pi-home', 
                            routerLink: ['/dashboard'] 
                        },
                        {
                            label: 'Book',
                            icon: 'pi pi-fw pi-book',
                            routerLink: ['/book']
                        },
                        {
                            label: 'Author',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/author']
                        },
                        {
                            label: 'Publisher',
                            icon: 'pi pi-fw pi-share-alt',
                            routerLink: ['/publisher']
                        },
                ],
            },
            ];
        }

      
        this.model = [
                {
                label: 'Home',
                items: [
                    { 
                        label: 'Profile', 
                        icon: 'pi pi-fw pi-user', 
                        routerLink:['/'] },
                    { 
                        label: 'Settings', 
                        icon: 'pi pi-fw pi-bars',
                        items: [
                            {
                                label: 'Privacy',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/settings']
                            },
                            {
                                label: 'Security',
                                icon: 'pi pi-fw pi-key',
                                routerLink: ['/change-password']
                            },
                            
                        ]
                    },
                    // {
                    //     label: 'Authenticate',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: 
                    //         [
                    //             {
                    //                 label: 'Register',
                    //                 icon: 'pi pi-fw pi-user-plus',
                    //                 routerLink: ['/auth/register']
                    //             },
                    //             {
                    //                 label: 'Login',
                    //                 icon: 'pi pi-fw pi-sign-in',
                    //                 routerLink: ['/auth/login']
                    //             },
                    //             {
                    //                 label: 'Error',
                    //                 icon: 'pi pi-fw pi-times-circle',
                    //                 routerLink: ['/auth/error']
                    //             },
                    //             {
                    //                 label: 'Access Denied',
                    //                 icon: 'pi pi-fw pi-lock',
                    //                 routerLink: ['/auth/access']
                    //             }
                    //         ]
                    //     },
                ],
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Top Books',
                        icon: 'pi pi-fw pi-star-fill',
                        routerLink: ['/pages/media']
                    },
                    {
                        label: 'List Books',
                        icon: 'pi pi-fw pi-shopping-bag',
                        routerLink: ['/pages/list']
                    },
                    {
                        label: 'Library Cart',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['/cart']
                    },
                    {
                        label: 'Wish',
                        icon: 'pi pi-fw pi-heart',
                        routerLink: ['/wish']
                    },
                    {
                        label: 'Subscription',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/subscription']
                    },
                ]
            },
        ];
    }

    
}
