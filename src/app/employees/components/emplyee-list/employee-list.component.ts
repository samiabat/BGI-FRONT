import { EmployeeService } from './../../services/employee.service';
import { ConfirmDeleteDialogComponent } from '../../../confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeFormComponent } from '../employeeform/employee-form.component';
import { EmployeeFacade } from '../../facades/employee.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [EmployeeFacade],
})
export class EmployeeListComponent implements OnInit {
  d_Colums: string[] = ['id', 'name', 'phone', 'email', 'active', 'updated_date', 'deletedBy', 'created_date', 'det','del', 'edit'];
  dSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeFacade: EmployeeFacade,
    private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEmployee();
    // this.employeeFacade.employies$.subscribe((data) => (this.dataset = data));
  }

  getEmployee(){
    this.employeeFacade.employies$.subscribe((data)=>{
      this.dSource = new MatTableDataSource(data);
      this.dSource = new MatTableDataSource(data);
      this.dSource.paginator = this.paginator;
      this.dSource.sort = this.sort;
    })
  }
  addEmployee() {
    this.matDialog.open(EmployeeFormComponent, {
      data: { update: false },
    });
  }

  editEmployee(employee: Employee) {
    console.log(employee);
    this.employeeFacade.selectEmployee(employee);
    this.matDialog.open(EmployeeFormComponent, {
      data: { update: true },
    });
  }

  deleteEmployee(employee: Employee) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && employee.id) {
        this.employeeFacade.deleteEmployee(employee.id);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dSource.filter = filterValue.trim().toLowerCase();

    if (this.dSource.paginator) {
      this.dSource.paginator.firstPage();
    }
  }
}
