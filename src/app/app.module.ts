import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModules } from './shared-modules.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ComponentComponent } from './security/component/component.component';
import { AuthenticationFacade } from './security/facade/authentication.facade';

@NgModule({
  declarations: [AppComponent, NavigationComponent, ComponentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModules,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [AuthenticationFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
