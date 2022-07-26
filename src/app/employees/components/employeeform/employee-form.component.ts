import { SectorFacade } from './../../../sectors/facades/sector.facade';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleFacade } from 'src/app/roles/facades/role.facade';
import { Sector } from 'src/app/sectors/models/sector.model';
import { Employee } from '../../models/employee.model';
import { EmployeeFacade } from '../../facades/employee.facade';


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
      mobile: ['', Validators.required],
      email_address:['', Validators.required],
      full_name: '',
      title: '',
      description: '',
      sam_account: '',
      company: '',
      country: '',
      department: '',
      telephone_number: '',
      street_address: '',
      login: '',
    });
  }

  ngOnInit(): void {
    if (this.update) {
      this.employeeFacade.selectedEmployee$.subscribe((data) => {
        this.employeeToUpdate = data;
        this.employeeForm.patchValue({ ...this.employeeToUpdate });
      });
    }
  }


  save() {
    console.log(this.employeeForm);
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
