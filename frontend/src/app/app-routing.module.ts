import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './demo/components/security/auth.guard';
import { HasRoleGuard } from 'src/has-role.guard';

const routes: Routes = [
    
    // {
    //    path: 'dashboard', component: AppLayoutComponent, canActivate: [AuthGuard, HasRoleGuard], loadChildren: () => import('./demo/components/admin/dashboard/dashboard.module').then(m => m.DashboardModule) , data: { role: 'ROLE_ADMIN'}
    // },
    // {
    //     path: 'book', component: AppLayoutComponent, canActivate: [AuthGuard, HasRoleGuard], loadChildren: () => import('./demo/components/admin/book/book.module').then(m => m.BookModule) , data: { role: 'ROLE_ADMIN'}
    // },
    // {
    //     path: 'author', component: AppLayoutComponent, canActivate: [AuthGuard, HasRoleGuard], loadChildren: () => import('./demo/components/admin/author/author.module').then(m => m.AuthorModule) , data: { role: 'ROLE_ADMIN'}
    // },
    // {
    //     path: 'publisher', component: AppLayoutComponent, canActivate: [AuthGuard, HasRoleGuard], loadChildren: () => import('./demo/components/admin/publisher/publisher.module').then(m => m.PublisherModule) , data: { role: 'ROLE_ADMIN'}
    // },
    {
        path: 'dashboard', component: AppLayoutComponent, canActivate: [AuthGuard], loadChildren: () => import('./demo/components/admin/dashboard/dashboard.module').then(m => m.DashboardModule) 
     },
     {
         path: 'book', component: AppLayoutComponent, canActivate: [AuthGuard], loadChildren: () => import('./demo/components/admin/book/book.module').then(m => m.BookModule)
     },
     {
         path: 'author', component: AppLayoutComponent, canActivate: [AuthGuard], loadChildren: () => import('./demo/components/admin/author/author.module').then(m => m.AuthorModule)
     },
     {
         path: 'publisher', component: AppLayoutComponent, canActivate: [AuthGuard], loadChildren: () => import('./demo/components/admin/publisher/publisher.module').then(m => m.PublisherModule) 
     },

    {
        path: '', component: AppLayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule)},
            { path: 'settings',  loadChildren: () => import( './demo/components/settings/settings.module').then(m => m.SettingsModule)  },
            { path: 'change-password',  loadChildren: () => import( './demo/components/password/changepassword.module').then(m => m.changepasswordModule)  },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'cart', loadChildren: () => import('./demo/components/cart/cart.module').then(m => m.CartModule) },
            { path: 'wish', loadChildren: () => import('./demo/components/wish/wish.module').then(m => m.WishModule) },
            { path: 'user',  loadChildren: () => import( './demo/api/user-detail/user.module').then(m => m.UserModule)  },
            { path: 'subscription',  loadChildren: () => import( './demo/components/subscription/subscription.module').then(m => m.SubscriptionModule)  },
            { path: 'success', loadChildren: () => import('./demo/components/stripe/success/success.module').then(m=>m.SuccessModule) },
        ],
    },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}