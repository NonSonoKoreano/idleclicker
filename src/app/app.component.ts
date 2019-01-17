import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ CookieService ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'idleclicker';
}
