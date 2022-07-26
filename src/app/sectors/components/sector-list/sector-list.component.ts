import { RoleFacade } from 'src/app/roles/facades/role.facade';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Column, GridOption, Formatters, OnEventArgs } from 'angular-slickgrid';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { SectorFacade } from '../../facades/sector.facade';
import { Sector } from '../../models/sector.model';
import { SectorFormComponent } from '../sector-form/sector-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/roles/models/role.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss'],
  providers: [SectorFacade, RoleFacade],
})
export class SectorListComponent implements AfterViewInit {
  d_Colums: string[] = ['id', 'name', 'role', 'active', 'createdBy', 'updated_date', 'deletedBy', 'created_date', 'det'];
  dSource!: MatTableDataSource<Sector>;
  role!: Role;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sectorFacade: SectorFacade,
    private matDialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.refresh();
  }

  public refresh() {
    this.sectorFacade.sectors$.subscribe(res=>{
      this.dSource = new MatTableDataSource(res);
      this.dSource.paginator = this.paginator;
    })
  }



  editStat(stat: Sector) {
    this.sectorFacade.selectSector(stat);
    this.matDialog.open(SectorFormComponent, {
      data: { update: true },
    }).afterClosed().subscribe( responce => { 
      this.refresh() });
  }

  deleteStat(stat: Sector) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && stat.id) {
        this.sectorFacade.deleteSector(stat.id);
        this.refresh();
      }
    });
  }

  addSector() {
    this.matDialog.open(SectorFormComponent, {
      data: { update: false },
    }).afterClosed().subscribe( responce => { 
      this.refresh() });
  }

  editSector(sector: Sector) {
    this.sectorFacade.selectSector(sector);
    this.matDialog.open(SectorFormComponent, {
      data: { update: true },
    }).afterClosed().subscribe( _ => { 
      this.refresh();
    });
  }

  deleteSector(sector: Sector) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && sector.id) {
        this.sectorFacade.deleteSector(sector.id);
        this.refresh();
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
