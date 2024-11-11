import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './modules/cliente/cliente/cliente.component';
import { TransacoesComponent } from './modules/transacoes/transacoes/transacoes.component';
import { ExtratoComponent } from './modules/extrato/extrato/extrato.component';


const routes: Routes = [
  { path: '', redirectTo: '/cliente', pathMatch: 'full' },  
  { path: 'cliente', component: ClienteComponent },
  { path: 'transacoes/:clientId', component: TransacoesComponent },
  { path: 'extrato/:clientId', component: ExtratoComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
