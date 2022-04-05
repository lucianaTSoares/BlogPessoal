import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario
  senhaConfirmada: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.senhaConfirmada = event.target.value
  }

  selectTipoUsuario(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.senhaConfirmada) {
      alert('Senha incorreta, tente novamente!')

    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        alert('Usuário cadastrado com sucesso!') })
    }

  }
}
