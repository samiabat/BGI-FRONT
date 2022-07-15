import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModules } from './shared-modules.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModules,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    AngularSlickgridModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
