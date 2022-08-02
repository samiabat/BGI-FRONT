import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModules } from '../shared-modules.module';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModules
  ]
})
export class AuthModule { }
