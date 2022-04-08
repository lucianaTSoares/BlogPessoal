import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  usuario: Usuario = new Usuario()
  tema: Tema = new Tema()
  listaTema: Tema[]
  listaPost: Postagem[]
  idTema: number
  idUsuario = environment.id

  constructor(
    private router: Router,
    private temaService: TemaService,
    private postService: PostagemService,
    private authService: AuthService) { }

  ngOnInit() {

    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    this.authService.refreshToken()
    this.buscarTemas()
    this.buscarPostagens()
    this.buscarIdUsuario()
  }

  buscarIdUsuario() {
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  buscarTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp
    })
  }

  buscarIdTemas() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  buscarPostagens() {
    this.postService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPost = resp 
    })
  }

  publicarPostagem() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.buscarPostagens()
      this.postagem = new Postagem()
    })
  }

}
