import { Component, OnInit } from '@angular/core'
import { AuthenticationFacade } from './security/facade/authentication.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent{
  title = 'BGI Employee Info'
  isAuthenticated$ = this.authenticationF.isAuthenticated$;


  constructor(public authenticationF: AuthenticationFacade) {}
 
}
