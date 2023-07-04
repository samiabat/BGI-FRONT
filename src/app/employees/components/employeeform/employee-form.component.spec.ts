// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxsModule, Store } from '@ngxs/store';
// import { environment } from 'src/environments/environment';
// import { EmployeeFormComponent } from './employee-form.component';


// describe('ActivityFormComponent', () => {
//     let component: EmployeeFormComponent;
//     let fixture: ComponentFixture<EmployeeFormComponent>;


//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             declarations: [EmployeeFormComponent],
//             providers: [
//                 FormBuilder,
//                 Store,
//                 { provide: MAT_DIALOG_DATA, useValue: {} },
//             ],
//             imports: [
//                 BrowserModule,
//                 BrowserAnimationsModule,
//                 ReactiveFormsModule,
//                 NgxsModule.forRoot([], { developmentMode: !environment.production }),
//                 MatDialogModule,
//                 MatInputModule,
//                 MatSelectModule,
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//         }).compileComponents();
//     });
//     beforeEach(() => {
//         fixture = TestBed.createComponent(EmployeeFormComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });