import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModules } from '../shared-modules.module';
import { ComponentComponent } from './component/component.component';
import { SecurityRoutingModule } from './security-routing.module';
import { AuthenticationState } from './store/authentication.states';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModules, 
    SecurityRoutingModule,
    NgxsModule.forFeature([AuthenticationState]),
  ],
})
export class SecurityModule {}