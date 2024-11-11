import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clienteForm!: FormGroup;
  clienteCadastrado = false;
  clienteId: number = 0;  
  clientes: Array<any> = [];  
  formularioEnviado: boolean = false;

  constructor(private snackBar: MatSnackBar, private router: Router, private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]), 
      idade: new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)]), 
      email: new FormControl('', [Validators.required, Validators.email]),
      numeroConta: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,12}$')])
    });
  }

  isFormValid(): boolean {
    return this.clienteForm.valid;
  }


  onSubmit() {
    this.formularioEnviado = true;
  
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;
  
      this.clienteService.cadastrarCliente(clienteData).subscribe(
        (response) => {
          this.clienteId = response.id;
          this.clienteCadastrado = true;
  
          this.snackBar.open(`Cliente cadastrado com sucesso!`, 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
  
          this.clienteForm.reset();
          this.formularioEnviado = false;
        },
        (error) => {
          console.error('Erro ao cadastrar cliente', error);
          this.snackBar.open('Erro ao cadastrar cliente. Tente novamente.', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  }
  


  irParaTransacoes() {
    this.clienteCadastrado = false;
    this.router.navigate(['/transacoes', this.clienteId]);

  }

  get f() {
    return this.clienteForm.controls;
  }
}


