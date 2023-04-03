import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
        { path: 'media', loadChildren: () => import('./media/media.module').then(m => m.MediaModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'book-detail/:id', loadChildren: () => import('./book-detail/book-detail.module').then(m => m.BookDetailModule) },
        
    ])],
    exports: [RouterModule] 
})
export class PagesRoutingModule { }
