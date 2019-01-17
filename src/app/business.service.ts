import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BusinessService {

gold = 2;
error;
context: any = 0;
inizio = false
molt: any = 1;
moltDesc: any = " Moltiplicatore X1"
totalPs;
business: any = [ 
  {name: "Fattorie", amount: 0, cost: 0, id: '', image: 'https://img.freepik.com/vettori-gratuito/paesaggio-divertente-con-la-fattoria-e-girasoli-fumetto-illustrazione-vettoriale_1196-526.jpg?size=338&ext=jpg'}, 
  {name: "Schiavitù", amount: 0, cost: 0, id: '', image: 'https://i0.wp.com/www.nationalreview.com/wp-content/uploads/2015/07/false-legacy-of-slavery-2.jpg?fit=788%2C460&ssl=1'}, 
  {name: "Baratto", amount: 0, cost: 0, id: ''}, 
  {name: "Trasporti su Ruota", amount: 0, cost: 0, id: ''}, 
  {name: "Macchine a vapore", amount: 0, cost: 0, id: ''}, 
  {name: "Navale", amount: 0, cost: 0, id: ''}, 
  {name: "Ferrovie", amount: 0, cost: 0, id: ''}, 
  {name: "Trasporti Aerei", amount: 0, cost: 0, id: ''},
  {name: "Bobine di Tesla", amount: 0, cost: 0, id: ''},  
  {name: "Centrali Nucleari", amount: 0, cost: 0, id: ''}, 
  {name: "Centrali Geotermiche", amount: 0, cost: 0, id: ''}, 
  {name: "Pannelli Solari", amount: 0, cost: 0, id: ''}, 
  {name: "Internet Inc.", amount: 0, cost: 0, id: ''}, 
  {name: "Social Media Inc.", amount: 0, cost: 0, id: ''}, 
  {name: "Base Lunare", amount: 0, cost: 0, id: ''}, 
  {name: "Ascensore Spaziale", amount: 0, cost: 0, id: ''}, 
  {name: "Commercio Terra-Luna", amount: 0, cost: 0, id: ''}, 
  {name: "Trasporti Interplanetari", amount: 0, cost: 0, id: ''},
  {name: "Anelli Planetari (I)", amount: 0, cost: 0, id: ''}, 
  {name: "Sfera di Dyson sul Sole (II)", amount: 0, cost: 0, id: ''},
  {name: "Via Lattea (III)", amount: 0, cost: 0, id: ''},
  {name: "Super Ammasso Locale (IV)", amount: 0, cost: 0, id: ''},
  {name: "Assorbimento dell'universo (V)", amount: 0, cost: 0, id: ''},
  {name: "Conquista dei Multiversi (VI) ", amount: 0, cost: 0, id: ''},
  {name: "Creazione di Universi (VI) ", amount: 0, cost: 0, id: ''},
  {name: "Energia Non-Cosmica (VIII)", amount: 0, cost: 0, id: ''},
  {name: "Fonte Extra-Cosmica (IX)", amount: 0, cost: 0, id: ''},
  {name: "Dio Di Tutti Gli Universi Non-Cosmici (X) ", amount: 0, cost: 0, id: ''}, ]
businessAmount = new Array();

  constructor() { }

  getMolt(){
    if (this.molt >= 1 && this.molt < 7)
       { this.molt ++
        this.moltDesc = "Moltiplicatore X"
        this.moltDesc = this.moltDesc + this.molt
       
        }
    if (this.molt == 6){
        this.moltDesc = "Moltiplicatore Max"
        
        

    }
    if (this.molt == 7){
        this.moltDesc = "Moltiplicatore X1"
        this.molt = 1
        

    }
  }


  getList() {
    return this.business;
  }

  
  update() {
    
    
      if (this.business[0].amount != 0 ){
      this.inizio = true
      }
    for(let i = 0; i < this.business.length; i++) {
      // creo il valore di gold al secondo totale
      let x = this.business[i].amount * ((i + 5) * (i + 1))
      // aggiungo i gold in base a quanti ne hai
      this.gold += Math.floor(x)
      // creo una potenza dei ps al secondo
      this.business[i].amountPs = Math.floor(Number(x) *  ((i + 1) * (i + 1 ) * (i + 1)))
      let y: any = (Number(this.business[i].amountPs)).toFixed()
      //creo il valore di generazione
      this.business[i].amountPower = Math.floor(y / this.business[i].amount)
      //mostro il numero sui bottoni      
       this.business[i].maxBuy = (this.gold / this.business[i].cost).toFixed()

       // questo for dovrebbe aggiornare in rt e calcolare il massimo acquistabile
     
        
        
      }

    this.totalPs = this.business.reduce((cum, cur) => cum + cur.amountPs, 0)
    this.error = ''
  }

  upAchivement(){
    for(let i = 0; i < this.business.length; i++) {
    if (this.business[i].amount >= 10) {
      this.context = "10 " + this.business[i].name }
      if (this.business[i].amount >= 30) {
        this.context = "30 " + this.business[i].name }
        if (this.business[i].amount >= 50) {
          this.context = "50 " + this.business[i].name }
    
    if (this.business[i].amount >= 100) {
      this.context = "100 " + this.business[i].name }
    
    if (this.business[i].amount >= 1000) {
      this.context = "1k " + this.business[i].name }

      if (this.business[i].amount >= 10000) {
        this.context = "10k " + this.business[i].name }
    }
  }

  setBusiness(){
    for(let i = 1 ; i < this.business.length; i++) {
      this.business[i].amount = 0
      this.business[i].cost = ((i + 2) * (i + 1) * (i + 1)) * ((this.business[i].amount + 2) *4) *10 * i * i
      this.business[i].id = "id"+ [i]
        }
  }
  
  
  }

 