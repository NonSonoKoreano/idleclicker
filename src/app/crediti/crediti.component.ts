import { Component, OnInit } from '@angular/core';
import { BusinessService } from "../business.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crediti',
  templateUrl: './crediti.component.html',
  styleUrls: ['./crediti.component.scss']
})

export class CreditiComponent implements OnInit {
  list;
  selectedBusiness;
  moltClick = 1;
  updateFun;
  moltClickPrezzo = 30;
  gold;
  roundClick = undefined;

  


  constructor(public service: BusinessService) {
    this.list = service.getList()
    this.gold = service.gold;
  }

  shortenNumber (num, decimalPlaces) {
    var str,
        suffix = '';

    decimalPlaces = decimalPlaces || 0;
    num = +num;

    var factor = Math.pow(10, decimalPlaces);



    if (num < 1000) {
        str = num;
    } else if (num < 1000000) {
        str = Math.floor(num / (1000 / factor)) / factor;
        suffix = 'K';
    } else if (num < 1000000000) {
        str = Math.floor(num / (1000000 / factor)) / factor;
        suffix = 'M';
    } else if (num < 1000000000000) {
        str = Math.floor(num / (1000000000 / factor)) / factor;
        suffix = 'B';
    } else if (num < 1000000000000000) {
        str = Math.floor(num / (1000000000000 / factor)) / factor;
        suffix = 'T';
    }
    return str + suffix;
}
aumentaClick(){
    if(this.service.gold >= this.moltClickPrezzo){

    
    this.service.gold = this.service.gold - this.moltClickPrezzo
    this.moltClickPrezzo = this.moltClickPrezzo * 2
    this.moltClick = Math.round(this.moltClick * 1.8)
}

}
compraClick(){
    this.service.gold = this.service.gold + this.moltClick
    this.roundClick = this.moltClick

}
colorBtnClick(){
    if (this.service.gold >= this.moltClickPrezzo) {
        return "btn btn-primary float-right";
      } else return "btn btn-danger float-right";
    }

    resetNotificationClick(){
        this.roundClick = undefined
    }

  ngOnInit() {
    setInterval(() => {
        this.resetNotificationClick();
      }, 1500);
  }

}
