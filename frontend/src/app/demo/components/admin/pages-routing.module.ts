import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'author', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
        { path: 'publisher', loadChildren: () => import('./publisher/publisher.module').then(m => m.PublisherModule) },
        { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
    ])],
    exports: [RouterModule] 
})
export class PagesRoutingModule { }
