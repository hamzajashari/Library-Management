import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuccessComponent } from './success.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SuccessComponent }
    ])],
    exports: [RouterModule]
})
export class SuccessRoutingModule { }
