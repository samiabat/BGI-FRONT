import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column, GridOption, Formatters, OnEventArgs } from 'angular-slickgrid';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { SectorFacade } from '../../facades/sector.facade';
import { Sector } from '../../models/sector.model';
import { SectorFormComponent } from '../sector-form/sector-form.component';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss'],
  providers: [SectorFacade],
})
export class SectorListComponent implements OnInit {
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset!: Sector[];

  constructor(
    private sectorFacade: SectorFacade,
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
          this.editSector(args.dataContext);
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
          this.deleteSector(args.dataContext);
        },
      },
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        sortable: true,
      },
      {
        id: 'role',
        name: 'Role',
        field: 'role',
        formatter: Formatters.complexObject,
        sortable: true,
      },

      {
        id: 'created',
        name: 'Created By',
        field: 'created',
        sortable: true,
      },

      {
        id: 'updated',
        name: 'Updated By',
        field: 'updated',
        sortable: true,
      },
      {
        id: 'created-date',
        name: 'Created Date',
        field: 'created-date',
        formatter: Formatters.complexObject,
        sortable: true,
      },
      {
        id: 'updated-date',
        name: 'Updated Date',
        field: 'updated-date',
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
    this.sectorFacade.sectors$.subscribe((data) => (this.dataset = data));
  }

  addSector() {
    this.matDialog.open(SectorFormComponent, {
      data: { update: false },
    });
  }

  editSector(sector: Sector) {
    this.sectorFacade.selectSector(sector);
    this.matDialog.open(SectorFormComponent, {
      data: { update: true },
    });
  }

  deleteSector(sector: Sector) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && sector.id) {
        this.sectorFacade.deleteSector(sector.id);
      }
    });
  }
}
