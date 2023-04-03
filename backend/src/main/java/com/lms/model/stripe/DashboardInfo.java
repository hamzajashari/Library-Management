package com.lms.model.stripe;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardInfo {

    private int orders;
    private double percentageOrders;
    private double revenue;
    private double percentageRevenue;
    private int Sub;
    private double percentageSub;
}
