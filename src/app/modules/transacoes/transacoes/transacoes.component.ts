import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../cliente/cliente.service';




@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss'],
})
export class TransacoesComponent implements OnInit{
  transacaoForm: FormGroup;
  clientId!: string | null;
  transacaoCadastrada: boolean = false;
  id: number = 0;
  clientName: any = "";
  saldoTotal: any;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router, private clienteService: ClienteService) {
    this.transacaoForm = new FormGroup({
      tipo: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(1),  Validators.pattern('^[0-9]*$') ]),
      descricao: new FormControl(''),
    });
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get('clientId');
      this.id = Number(this.clientId)
    });
    this.clienteService.getClienteNome(this.id).subscribe(
      (response: any) => {
        const nomeCliente = response.nome;
        this.clientName = nomeCliente.charAt(0).toUpperCase() + nomeCliente.slice(1)
      },
      (error) => {
        console.error(error);
      }
    );

    this.clienteService.getSomaExtrato(this.id).subscribe(
      (response: any) => {
        console.log(response);

        this.saldoTotal = response.saldoTotal;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.transacaoForm.valid) {

      const transacao = {
        clienteId: this.clientId!,
        tipo: this.transacaoForm.get('tipo')?.value,
        valor: this.transacaoForm.get('valor')?.value,
        descricao: this.transacaoForm.get('descricao')?.value
      };
      
      this.clienteService.cadastrarTransacao(this.id, transacao.tipo, transacao.valor).subscribe(
        (response: any) => {
          console.log(response, "here");
          this.transacaoCadastrada = true;
        },
        (error) => {
          console.error(error);
        }
      );

    } else {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  verExtrato(): void {
    this.router.navigate([`/extrato/${this.clientId}`]);
  }
}
  




