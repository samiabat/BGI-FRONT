import { RoleFacade } from 'src/app/roles/facades/role.facade';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Column, GridOption, Formatters, OnEventArgs } from 'angular-slickgrid';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { SectorFacade } from '../../facades/sector.facade';
import { Sector } from '../../models/sector.model';
import { SectorFormComponent } from '../sector-form/sector-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface SectorData{
  id: string;
  name: string;
  role: string;
  deleted: boolean;
  createdBy: string;
  updatedBy: string;
  deletedBy: string;
}

const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss'],
  providers: [SectorFacade, RoleFacade],
})
export class SectorListComponent implements AfterViewInit {
  d_Colums: string[] = ['id', 'name', 'role', 'deleted', 'createdBy', 'updatedBy', 'deletedBy'];
  dSource!: MatTableDataSource<SectorData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sectorFacade: SectorFacade,
    private matDialog: MatDialog) {
    const sectors = Array.from({length: 100}, (_, k) => createNewSector(k + 1));
    this.dSource = new MatTableDataSource(sectors);
  }

  ngAfterViewInit() {
    this.dSource.paginator = this.paginator;
    this.dSource.sort = this.sort;
  }

  

  editStat(stat: Sector) {
    this.sectorFacade.selectSector(stat);
    this.matDialog.open(SectorFormComponent, {
      data: { update: true },
    });
  }

  deleteStat(stat: Sector) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && stat.id) {
        this.sectorFacade.deleteSector(stat.id);
      }
    });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dSource.filter = filterValue.trim().toLowerCase();

    if (this.dSource.paginator) {
      this.dSource.paginator.firstPage();
    }
  }
}

function createNewSector(id: number): SectorData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    role: name,
    deleted: false,
    createdBy: name,
    updatedBy: name,
    deletedBy: name,
  };
}