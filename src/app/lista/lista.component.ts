import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

import { BusinessService } from "../business.service";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"]
})
export class ListaComponent implements OnInit {
  list;
  cookieValue1: {};
  cookieValue2: any;
  selectedBusiness;
  updateFun;
  setBusiness;
  gold;
  error;
  inizio;
  button;
  totalPs;
  returnMolt;
  molt: any = 1;
  moltDesc: any = "X1";

  constructor(public service: BusinessService,
    public cookieService: CookieService ) {
    this.list = service.getList();
    this.gold = service.gold;
    this.totalPs = service.business.totalPs;
    this.molt = service.molt;
    this.moltDesc = service.moltDesc;
    this.inizio = service.inizio;
  }

  moltFun() {
    this.service.getMolt();
  }

  shortenNumber(num, decimalPlaces) {
    var str,
      suffix = "";

    decimalPlaces = decimalPlaces || 0;
    num = +num;

    var factor = Math.pow(10, decimalPlaces);

    if (num < 1000) {
      str = num;
    } else if (num < 1000000) {
      str = Math.floor(num / (1000 / factor)) / factor;
      suffix = "K";
    } else if (num < 1000000000) {
      str = Math.floor(num / (1000000 / factor)) / factor;
      suffix = "M";
    } else if (num < 1000000000000) {
      str = Math.floor(num / (1000000000 / factor)) / factor;
      suffix = "B";
    } else if (num < 1000000000000000) {
      str = Math.floor(num / (1000000000000 / factor)) / factor;
      suffix = "T";
    }
    return str + suffix;
  }

  resetNotification() {
    for (let i = 0; i < Math.floor(this.service.business.length); i++) {
      this.service.business[i].round = undefined;
    }
  }

  bottone(singolo) {
    this.selectedBusiness = singolo;

    if (
      this.service.gold >= this.selectedBusiness.cost &&
      this.service.molt == 6
    ) {
      return "MAX";
    }
    if (
      this.service.gold >= this.selectedBusiness.cost &&
      this.service.molt != 6
    ) {
      return this.service.molt;
    } else return "Bloccato!";
  }

  coloreBottone(singolo) {
    this.selectedBusiness = singolo;

    if (this.service.gold >= this.selectedBusiness.cost) {
      return "btn btn-primary float-right";
    } else return "btn btn-danger float-right";
  }

  compraBusiness(singolo) {
    this.cookieService.set("100", "1");
    
    // creo la variabile di controllo del numero di round del for max
    let ni;

    this.selectedBusiness = singolo;

    // devo controllare se y è un numero +

    if (
      this.service.gold >= this.selectedBusiness.cost * this.service.molt &&
      this.service.molt != 6
    ) {
      //devo controllare anche che bastino i soldi
      if (this.service.molt >= 1 && this.service.molt < 6) {
        this.service.gold -= this.selectedBusiness.cost * this.service.molt;
        this.selectedBusiness.amount =
          this.selectedBusiness.amount + this.service.molt;
        // qui aumento il costo d'acquisto
        let y = this.selectedBusiness.cost;
        let z = y + 1;
        let x: number = Math.floor(z * 2.3);
        this.selectedBusiness.cost = Number(x) - this.selectedBusiness.cost;
        this.selectedBusiness.round = this.service.molt;
        if (this.selectedBusiness.round == 0) {
          this.selectedBusiness.round++;
        }
      }
    }

    // qui faccio la condizione del MAX
    if (this.service.molt == 6) {
      //qui calcolo il massimo acquistabile mxBuy è il numero
      this.selectedBusiness.maxBuy = (
        this.service.gold / this.selectedBusiness.cost
      ).toFixed();
      // controllo che il numero non sia una merda
      if (
        this.selectedBusiness.maxBuy == 0 ||
        this.selectedBusiness.maxBuy == undefined
      ) {
        this.selectedBusiness.maxBuy = 0;
      }
      // qui faccio l'acquisto ci sono dei problemi ( si può comprare in negativo a volte se si inizia con max scoppia tutto)
      // questo for acquista un pezzo alla volta e alla fine aumenta il prezzo
      if (this.selectedBusiness.maxBuy >= 1) {
        for (let i = 0; i < Math.floor(this.selectedBusiness.maxBuy); i++) {
          this.service.gold -= this.selectedBusiness.cost;
          this.selectedBusiness.amount++;
          // qui aumento il costo d'acquisto
          let y = this.selectedBusiness.cost;
          let z = y + 1;
          let x: number = Math.floor(z * 2.3);
          this.selectedBusiness.cost = Number(x) - this.selectedBusiness.cost;
          // aggiungo + 1 alla variabile del round
          ni = i + 1;
          if (ni == 0) {
            ni = 1;
          }
          // scrivo il round nell'oggetto perchè sono ritardato
          this.selectedBusiness.round = ni;
          this.selectedBusiness.maxBuy = (
            this.service.gold / this.selectedBusiness.cost
          ).toFixed();
        }
        // se sono a 0 aggiunge 1 non serve a un cazzo perchè aggiungo già uno sopra, ma mi piaceva lasciarlo a cazzo
        if (ni == 0) {
          ni = 1;
        }
        // scrivo il round nell'oggetto perchè sono ritardato
        this.selectedBusiness.round = ni;
      }
    }


    // qui inizio a scrivere i cookie
    let json_str: any
    
    json_str = encodeURIComponent(JSON.stringify(this.service.business))

    let json_strSplit = json_str.split("name")
    for(let i= 0 ; i < json_strSplit.length; i++ ){
      if(i == 0){
        this.cookieService.set(i.toString(), json_strSplit[i]);
      }
      else{
      this.cookieService.set(i.toString(), "name" + json_strSplit[i]);
      }

    }
    
    console.log(this.service.business)
  }

  // qui faccio la funzione per prendere i cookie
  getCookie(){
    
    this.cookieValue1 = "%5B%7B%22"
    for(let i= 1 ; i <= 28; i++ ){      
      this.cookieValue1 += this.cookieService.get(i.toString())
      
    }
    let json_str:any = this.cookieValue1
    json_str = decodeURIComponent(json_str)
    json_str = JSON.parse(json_str)
     console.log(json_str);
     
    this.service.business = json_str

    
  }

  ngOnInit() {

    
    this.service.setBusiness();

    let check = this.cookieService.get("100")
      if(check == "1"){
          this.getCookie();
      }


    


    setInterval(() => {
      this.service.update();
      this.service.upAchivement();
    }, 1000 / 35);

    setInterval(() => {
      this.resetNotification();
    }, 2000);
  }
}
