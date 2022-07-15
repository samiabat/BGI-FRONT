import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const materialModules: any[] = [
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MatDividerModule,
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatSelectModule,
  MatCardModule,
  MatStepperModule,
  MatListModule,
  MatCheckboxModule,
  MatRadioModule,
  MatExpansionModule,
  MatTabsModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatBadgeModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTreeModule,
  MatChipsModule,
];

const otherModules: any[] = [
  LayoutModule,
  CommonModule,
  ReactiveFormsModule,
  FontAwesomeModule,
];

@NgModule({
  declarations: [],
  exports: [...materialModules, ...otherModules],
})
export class SharedModules {}
