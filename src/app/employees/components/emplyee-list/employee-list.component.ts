import { ConfirmDeleteDialogComponent } from '../../../confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeFormComponent } from '../employeeform/employee-form.component';
import { EmployeeFacade } from '../../facades/employee.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [EmployeeFacade],
})
export class EmployeeListComponent implements OnInit {
  d_Colums: string[] = ['id', 'name', 'phone', 'email', 'active', 'updated_date', 'deletedBy', 'created_date', 'det'];
  dSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeFacade: EmployeeFacade,
    private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
    this.employeeFacade.employies$.subscribe((data)=>{
      this.dSource = new MatTableDataSource(data);
      this.dSource = new MatTableDataSource(data);
      this.dSource.paginator = this.paginator;
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

  viewEmployee(employee: Employee){
    this.employeeFacade.selectEmployee(employee);
    const dialogRef = this.matDialog.open(DetailComponent,{
      data: {data: employee}
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
