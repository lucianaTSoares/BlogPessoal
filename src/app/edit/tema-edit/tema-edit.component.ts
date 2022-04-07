import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.buscarIdTema(id)
  }

  buscarIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  editarTema() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema atualizado!')
      this.router.navigate(['/tema'])
    })
  }

}
