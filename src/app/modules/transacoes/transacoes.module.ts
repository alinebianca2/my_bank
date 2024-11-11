import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskModule } from 'ngx-mask';  





@NgModule({
  declarations: [
    TransacoesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()

  ]
})
export class TransacoesModule { }
