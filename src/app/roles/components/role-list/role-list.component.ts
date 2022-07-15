import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column, Formatters, GridOption, OnEventArgs } from 'angular-slickgrid';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { RoleFacade } from '../../facades/role.facade';
import { Role } from '../../models/role.model';
import { RoleFormComponent } from '../role-form/role-form.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  providers: [RoleFacade],
})
export class RoleListComponent implements OnInit {
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset!: Role[];

  constructor(private matDialog: MatDialog, private roleFacade: RoleFacade) {
    this.columnDefinitions = [
      {
        id: 'edit',
        field: 'id',
        excludeFromHeaderMenu: true,
        formatter: Formatters.editIcon,
        minWidth: 30,
        maxWidth: 30,
        onCellClick: (e: Event, args: OnEventArgs) => {
          this.editStat(args.dataContext);
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
          this.deleteStat(args.dataContext);
        },
      },
      {
        id: 'description',
        name: 'Name',
        field: 'description',
        sortable: true,
      },
      {
        id: 'code',
        name: 'Created By',
        field: 'code',
        sortable: true,
      },

      {
        id: 'owner',
        name: 'Updated By',
        field: 'owner.name',
        formatter: Formatters.complexObject,
        sortable: true,
      },
      {
        id: 'owner',
        name: 'Created Date',
        field: 'owner.name',
        formatter: Formatters.complexObject,
        sortable: true,
      },
      {
        id: 'owner',
        name: 'Updated Date',
        field: 'owner.name',
        formatter: Formatters.complexObject,
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
    this.roleFacade.goals$.subscribe((data) => (this.dataset = data));
  }

  addGoal() {
    this.matDialog.open(RoleFormComponent, {
      data: { update: false },
    });
  }

  editStat(stat: Role) {
    this.roleFacade.selectRole(stat);
    this.matDialog.open(RoleFormComponent, {
      data: { update: true },
    });
  }

  deleteStat(stat: Role) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && stat.id) {
        this.roleFacade.deleteRole(stat.id);
      }
    });
  }
}
