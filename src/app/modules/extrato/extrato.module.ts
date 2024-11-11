import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtratoComponent } from './extrato/extrato.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ExtratoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule
  ]
})
export class ExtratoModule { }
