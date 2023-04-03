import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail.component';
import { BookDetailRoutingModule } from './book-detail-routing.module';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DividerModule} from 'primeng/divider';
import {ImageModule} from 'primeng/image';
import {CarouselModule} from 'primeng/carousel';
@NgModule({
    imports: [
        
        CommonModule,
        FormsModule,
        BookDetailRoutingModule,
        ReactiveFormsModule,
        ToastModule,
        CardModule,
        ButtonModule,
        RatingModule,
        InputTextareaModule,
        InputTextModule,
        DividerModule,
        ImageModule,
        CarouselModule,
        
    ],
    declarations: [BookDetailComponent]
})
export class BookDetailModule {
 }
