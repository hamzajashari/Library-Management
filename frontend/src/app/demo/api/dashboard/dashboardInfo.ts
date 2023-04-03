export class DashboardInfo {
    orders? :number;
    percentageOrders? :number;
    revenue? :number; 
    percentageRevenue? :number;
    sub? :number;
    percentageSub? :number;

    constructor(){
        this.orders=0;
        this.percentageOrders=0;
        this.revenue=0;
        this.percentageRevenue=0;
        this.sub=0;
        this.percentageSub=0;
    }
}