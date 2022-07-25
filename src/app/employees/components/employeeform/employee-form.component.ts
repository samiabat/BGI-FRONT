import { SectorFacade } from './../../../sectors/facades/sector.facade';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { RoleFacade } from 'src/app/roles/facades/role.facade';
import { Role } from 'src/app/roles/models/role.model';
import { Sector } from 'src/app/sectors/models/sector.model';
import { UnitOfMeasure } from '../../models/performance-indicator.model';
import { Employee } from '../../models/employee.model';
import { EmployeeFacade } from '../../facades/employee.facade';

interface Choise {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  providers: [EmployeeFacade, SectorFacade, RoleFacade],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  employeeToUpdate: Employee | null = null;
  update: boolean = false;
  sectors: Sector[] = [];

  selectedOffice: any;

  unitOfMeasures: string[] = [];

  choises: Choise[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'user', viewValue: 'Not Admin'},
  ];

  constructor(
    public employeeFacade: EmployeeFacade,
    private fb: FormBuilder,
    public sectorFacade: SectorFacade,
    public roleFacade: RoleFacade,
    

    @Inject(MAT_DIALOG_DATA) private data: { update: boolean }
  ) {
    this.update = this.data.update;
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      email_address:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.unitOfMeasures.push(...Object.values(UnitOfMeasure));
    if (this.update) {
      this.employeeFacade.selectedEmployee$.subscribe((data) => {
        this.employeeToUpdate = data;
        this.employeeForm.patchValue({ ...this.employeeToUpdate });
      });
    }
  }


  save() {
    const { valid, touched, dirty } = this.employeeForm;
    if (valid && (touched || dirty)) {
      if (!this.update) {
        this.employeeFacade.addEmployee({
          ...this.employeeForm.value,
        });
      }

      if (this.update && this.employeeToUpdate?.id) {
        this.employeeFacade.updateEmployee(this.employeeToUpdate?.id, {
          ...this.employeeForm.value,
        });
      }
    }
  }
}
