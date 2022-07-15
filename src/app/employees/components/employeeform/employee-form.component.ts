import { SectorFacade } from './../../../sectors/facades/sector.facade';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { RoleFacade } from 'src/app/roles/facades/role.facade';
import { Role } from 'src/app/roles/models/role.model';
import { Sector } from 'src/app/sectors/models/sector.model';
import { OfficeFacade } from 'src/app/offices/facades/office.facade';
import { Office } from 'src/app/offices/models/office.model';
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
  providers: [EmployeeFacade, OfficeFacade, SectorFacade, RoleFacade],
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
    public officeFacade: OfficeFacade,
    public sectorFacade: SectorFacade,
    public roleFacade: RoleFacade,
    

    @Inject(MAT_DIALOG_DATA) private data: { update: boolean }
  ) {
    this.update = this.data.update;
    this.employeeForm = this.fb.group({
      goal: ['', Validators.required],
      sector: ['', Validators.required],
      owner:['', Validators.required],
      description: ['', Validators.required],
      performanceIndicators: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          unitOfMeasure: ['', Validators.required],
        }),
      ]),
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

  get performanceIndicators() {
    return this.employeeForm.controls['performanceIndicators'] as FormArray;
  }

  addPerformanceIndicator() {
    const performanceIndicatorForm = this.fb.group({
      name: ['', Validators.required],
      unitOfMeasure: ['', Validators.required],
    });
    this.performanceIndicators.push(performanceIndicatorForm);
  }

  deletePerformanceIndicator(indicatorIndex: number) {
    if (this.performanceIndicators.length > 1) {
      this.performanceIndicators.removeAt(indicatorIndex);
    }
  }

  onGoalSelectionChange(event: MatSelectChange) {
    this.sectorFacade.getSectorById(event.value);
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

  officeComparator(office1: Office, office2: Office) {
    return (
      office1?.id === office2?.id &&
      office1?.name === office2?.name &&
      office1?.location == office2?.location
    );
  }

  sectorComparator(sector1: Sector, sector2: Sector) {
    return (
      sector1?.id === sector2?.id && sector1?.code === sector2?.code
    );
  }

  goalComparator(goal1: Role, goal2: Role) {
    return goal1?.id === goal2?.id && goal1?.code === goal2?.code;
  }
}
