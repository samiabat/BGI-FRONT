import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModules } from '../shared-modules.module';
import { ComponentComponent } from './component/component.component';
import { AuthenticationState } from './store/authentication.states';
@NgModule({
  declarations: [ComponentComponent],
  imports: [SharedModules, NgxsModule.forFeature([AuthenticationState])],
})
export class SecurityModule {}