import { EmployeeFacade } from './../../facades/employee.facade';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [EmployeeFacade],
})
export class DetailComponent implements OnInit {
  employeeData: Employee | null = null;
  d_Colums: string[] = ['id'];
  dSource!: MatTableDataSource<Employee>;
  // data!: any;
  constructor(
    private employeeFacade: EmployeeFacade,
    @Inject(MAT_DIALOG_DATA) private newData: { data: any }
    ) { }

  ngOnInit(): void {
    this.employeeFacade.selectedEmployee$.subscribe((res)=>{
      // console.log(res);
      this.employeeData=res;
      console.log(this.employeeData)
    })
  }

}
