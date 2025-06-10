import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
    emailContato : string = "contato@tcsolucoes.com";
    telContato   : string = "(XX) XXXX-XXXX";
    emailTrabalhe: string = "trabalheconosco@tcsolucoes.com";
    anoAtual     : number = new Date().getFullYear();
}
