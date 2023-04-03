import { Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { StripeService } from '../../../service/stripe/stripe.service';
import { DashboardInfo } from '../../../api/dashboard/dashboardInfo';
import { UserService } from '../../../service/user.service';
import { UserDashobard } from '../../../api/user-detail/UserDashboard';
import { BookService } from '../../../service/book.service';
import { Book } from '../../../api/book/Book';
import { SubscriptionService } from '../../../service/subscription/subscription.service';
import { Subs } from '../../../api/subs';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    items!: MenuItem[];

    recentSales: Book[];

    

    subs: Subs[];

    countSubs: number=0;

    sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    dashboardInfo=new DashboardInfo();

    usersCount=new UserDashobard();

    constructor(private userService: UserService,
        private stripeService: StripeService,
        private bookService: BookService,
        private subscriptionService: SubscriptionService, 
        public layoutService: LayoutService,
        private router: Router) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();

        this.stripeService.getOrders().subscribe(
            data => {
                this.dashboardInfo=data;
            }
        )
        
        this.userService.getUsersCount().subscribe(
            data=>{
                this.usersCount=data;
            }
        )

        this.bookService.getRecentSales().subscribe(
            data=>{
                this.recentSales=data;
            }
        )

        this.subscriptionService.getSubs().subscribe(
            data=>{
                this.subs=data;
            }
        )

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    changeSource(event) {      
        event.target.src = "assets/demo/images/product/noimage.jpg";
    }
    bookDetail(bookId:number){
        this.router.navigate(['/pages/book-detail',bookId]);
      }
    
    
    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Users',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Subscription',
                    data: [12, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
