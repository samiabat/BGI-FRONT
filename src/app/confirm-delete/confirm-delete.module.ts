import { NgModule } from '@angular/core';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { SharedModules } from '../shared-modules.module';

@NgModule({
  declarations: [ConfirmDeleteDialogComponent],
  imports: [SharedModules],
  exports: [ConfirmDeleteDialogComponent],
})
export class ConfirmDeleteModule {}
