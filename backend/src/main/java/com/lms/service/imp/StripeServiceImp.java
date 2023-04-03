package com.lms.service.imp;
import com.lms.model.stripe.CheckoutPayment;
import com.lms.model.stripe.DashboardInfo;
import com.lms.model.stripe.Subscription;
import com.lms.repository.StripeRepository;
import com.lms.repository.SubscriptionRepository;
import com.lms.service.StripeService;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StripeServiceImp implements StripeService {

    private final StripeRepository stripeRepository;
    private final SubscriptionRepository subscriptionRepository;


    public StripeServiceImp(StripeRepository stripeRepository, SubscriptionRepository subscriptionRepository) {
        this.stripeRepository = stripeRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public CheckoutPayment save(CheckoutPayment checkoutPayment) {
        return stripeRepository.save(checkoutPayment);
    }



    @Override
    public List<CheckoutPayment> findAll(){
        return stripeRepository.findAll();
    }

    @Override
    public DashboardInfo getDashboardInfo() {

        DashboardInfo dashboardInfo = new DashboardInfo();
        List<CheckoutPayment> data= this.stripeRepository.findAll();
        List<Subscription> sub= this.subscriptionRepository.findAll();
        //Order Size
        dashboardInfo.setOrders(data.size());

        //Revenue
        double revenue=data.stream().mapToDouble(o->o.getAmount()).sum()/100;
        dashboardInfo.setRevenue(revenue);

        //get 7 days from now
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -7);

        double percentageRevenue = data.stream().filter(f->f.getDateCreated().before(cal.getTime())).mapToDouble(r->r.getAmount()).sum()/100;
        dashboardInfo.setPercentageRevenue(percentageRevenue);

        double percentageOrders= data.stream().filter(f->f.getDateCreated().before(cal.getTime())).collect(Collectors.toList()).size();
        dashboardInfo.setPercentageOrders(percentageOrders);

        dashboardInfo.setSub(sub.size());
        double percentageSubs=sub.stream().filter(f->f.getDateCreated().before(cal.getTime())).collect(Collectors.toList()).size();
        dashboardInfo.setPercentageSub(percentageSubs);

        return dashboardInfo;
    }


}
