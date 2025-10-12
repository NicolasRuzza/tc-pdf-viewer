import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  imports: [],
  templateUrl: "./footer.html",
  styleUrl: "./footer.css"
})
export class Footer {
    emailContato : string = "assistencia@tctermofusao.com.br ";
    telContato   : string = "(11) 4526-4699";
    anoAtual     : number = new Date().getFullYear();
}
