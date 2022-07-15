import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column, Formatters, GridOption, OnEventArgs } from 'angular-slickgrid';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { OfficeFacade } from '../../facades/office.facade';
import { Office } from '../../models/office.model';
import { OfficeFormComponent } from '../office-form/office-form.component';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss'],
  providers: [OfficeFacade],
})
export class OfficeListComponent implements OnInit {
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset!: Office[];

  constructor(
    private officeFacade: OfficeFacade,
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
          this.editOffice(args.dataContext);
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
          this.deleteOffice(args.dataContext);
        },
      },
      {
        id: 'officeCode',
        name: 'Office Code',
        field: 'officeCode',
        sortable: true,
      },
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        sortable: true,
      },

      
      {
        id: 'location',
        name: 'Location',
        field: 'location',
        sortable: true,
      },
      {
        id: 'ownsActivities',
        name: 'Owns Activities',
        field: 'ownsActivities',
        sortable: false,
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
    this.officeFacade.offices$.subscribe((data) => (this.dataset = data));
  }

  addOffice() {
    this.matDialog.open(OfficeFormComponent, {
      data: { update: false },
    });
  }

  editOffice(office: Office) {
    this.officeFacade.selectOffice(office);
    this.matDialog.open(OfficeFormComponent, {
      data: { update: true },
    });
  }

  deleteOffice(office: Office) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && office.id) {
        this.officeFacade.deleteOffice(office.id);
      }
    });
  }
}
