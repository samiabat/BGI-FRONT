import { RoleService } from './../../services/role.service';
import { MatDialog } from '@angular/material/dialog';


import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RoleFacade } from '../../facades/role.facade';
import { Role } from '../../models/role.model';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { RoleFormComponent } from '../role-form/role-form.component';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
    providers: [RoleFacade],
})
export class RoleListComponent implements AfterViewInit {
  d_Colums: string[] = ['id', 'name', 'deleted', 'createdBy', 'updatedBy', 'deletedBy'];
  dSource!: MatTableDataSource<Role>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private roleFacade: RoleFacade,
    private roleService: RoleService,
    private matDialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles().subscribe((data)=>{
      this.dSource = new MatTableDataSource(data);
      this.dSource.paginator = this.paginator;
      this.dSource.sort = this.sort;
    })
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

  addRole() {
    this.matDialog.open(RoleFormComponent, {
      data: { update: false },
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
