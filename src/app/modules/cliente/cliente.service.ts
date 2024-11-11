import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private API_URL = 'http://localhost:8080/clientes';
  private API_URL_TRANSACOES = 'http://localhost:8080/transacoes';


  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getExtrato(clienteId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL_TRANSACOES}/${clienteId}/extrato`);
  }

  getSomaExtrato(clienteId: number): Observable<number> {
    return this.http.get<number>(`${this.API_URL_TRANSACOES}/${clienteId}/extrato`);
  }

  getClienteNome(clienteId: number): Observable<string> {
    return this.http.get<string>(`${this.API_URL}/${clienteId}`);
  }

  cadastrarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.API_URL, cliente); 
  }

  cadastrarTransacao(clienteId: number, tipo: string, valor: number): Observable<string> {
    const url = `${this.API_URL_TRANSACOES}/${clienteId}`; // URL para o POST
    
    const body = new URLSearchParams();
    body.set('tipo', tipo);
    body.set('valor', valor.toString());
  
    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded', 
      }),
      responseType: 'text', 
    });
  }
}
