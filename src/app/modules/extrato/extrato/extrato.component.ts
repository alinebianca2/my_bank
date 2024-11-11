import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../cliente/cliente.service';

interface Transacao {
  tipo: string;
  valor: number;
  descricao: string;
  clienteId?: number;
}

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  clienteId!: number; 

  transacoesFiltradas: Transacao[] = [];
  saldo: number = 0;  
  displayedColumns: string[] = ['tipo', 'valor', 'descricao'];
  clientName: string = "";
  saldoTotal: number = 0;
  extrato: any[] = [];


  constructor(private route: ActivatedRoute, private clienteService: ClienteService) {}

  ngOnInit(): void {
    const clienteIdFromRoute = this.route.snapshot.paramMap.get('clientId');
    const ID = Number(clienteIdFromRoute)


    this.clienteService.getClienteNome(ID).subscribe(
      (cliente: any) => {
        const nomeCliente = cliente.nome;
        this.clientName = nomeCliente.charAt(0).toUpperCase() + nomeCliente.slice(1)
      },
      (error) => {
        console.error(error);
      }
    );

    this.clienteService.getSomaExtrato(ID).subscribe(
      (response: any) => {
        if (response && response.extrato && Array.isArray(response.extrato)) {
          this.transacoesFiltradas = response.extrato; 
        } else {
          console.error(response);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  }

  

