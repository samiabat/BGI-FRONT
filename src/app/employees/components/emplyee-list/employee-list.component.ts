import { ConfirmDeleteDialogComponent } from '../../../confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column, Formatters, GridOption, OnEventArgs } from 'angular-slickgrid';
import { Employee } from '../../models/employee.model';
import { EmployeeFormComponent } from '../employeeform/employee-form.component';
import { Office } from 'src/app/offices/models/office.model';
import { PerformanceIndicator } from '../../models/performance-indicator.model';
import { EmployeeFacade } from '../../facades/employee.facade';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [EmployeeFacade],
})
export class EmployeeListComponent implements OnInit {
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset!: Employee[];

  constructor(
    private employeeFacade: EmployeeFacade,
    private matDialog: MatDialog
  ) {
    this.columnDefinitions = [
      {
        id: 'edit',
        field: 'id',
        excludeFromHeaderMenu: true,
        formatter: Formatters.editIcon,
        minWidth: 30,
        maxWidth: 30,
        onCellClick: (e: Event, args: OnEventArgs) => {
          this.editEmployee(args.dataContext);
        },
      },
      {
        id: 'delete',
        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        formatter: Formatters.deleteIcon,
        minWidth: 30,
        maxWidth: 30,
        onCellClick: (e: Event, args: OnEventArgs) => {
          this.deleteEmployee(args.dataContext);
        },
      },
      {
        id: 'objective',
        name: 'Name',
        field: 'objective.description',
        formatter: Formatters.complexObject,
        sortable: true,
      },
      {
        id: 'description',
        name: 'Phone',
        field: 'description',
        sortable: true,
      },
      {
        id: 'description',
        name: 'Email',
        field: 'description',
        sortable: true,
      },
      {
        id: 'owner',
        name: 'Role',
        field: 'owner.name',
        formatter:Formatters.complexObject,
        sortable: true,
      },

      
      {
        id: 'performanceIndicators',
        name: 'Assets',
        field: 'performanceIndicators.name',
        formatter: (
          _: number,
          __: number,

          ___: any,
          _____: Column,
          dataContext: any
        ) => {
          let performanceIndicators = dataContext.performanceIndicators;
          let performanceIndicatorsString = '';
          if (performanceIndicators.length) {
            performanceIndicators.map(
              (performanceIndicator: PerformanceIndicator) => {
                performanceIndicatorsString +=
                  ',' + `${performanceIndicator.name.toUpperCase()}`;
              }
            );
            return performanceIndicatorsString.substring(
              1,
              performanceIndicatorsString.length
            );
          } else {
            return 'No PerformanceIndicators';
          }
        },
      },
      {
        id: 'code',
        name: 'Created By',
        field: 'code',
        sortable: true,
      },

      {
        id: 'code',
        name: 'Updated By',
        field: 'code',
        sortable: true,
      },

      {
        id: 'code',
        name: 'Created Date',
        field: 'code',
        sortable: true,
      },

      {
        id: 'code',
        name: 'Updated Date',
        field: 'code',
        sortable: true,
      },
    ];
    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true,
      enableGrouping: true,
      // gridHeight: 225,
      gridWidth: '100%',
      enableCellNavigation: true,
      enableRowSelection: true,
      editable: false,
      multiSelect: false,
      rowSelectionOptions: {
        selectActiveRow: true,
      },
      enableGridMenu: false,
      enableHeaderMenu: false,
      enableContextMenu: false,
      enableCellMenu: false,
    };
  }

  ngOnInit(): void {
    this.employeeFacade.employies$.subscribe((data) => (this.dataset = data));
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
}
