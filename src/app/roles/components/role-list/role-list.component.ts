// import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Column, Formatters, GridOption, OnEventArgs } from 'angular-slickgrid';
// // import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
// import { RoleFacade } from '../../facades/role.facade';
// import { Role } from '../../models/role.model';
// import { RoleFormComponent } from '../role-form/role-form.component';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }

// /** Constants used to fill up our data base. */
// const FRUITS: string[] = [
//   'blueberry',
//   'lychee',
//   'kiwi',
//   'mango',
//   'peach',
//   'lime',
//   'pomegranate',
//   'pineapple',
// ];
// const NAMES: string[] = [
//   'Maia',
//   'Asher',
//   'Olivia',
//   'Atticus',
//   'Amelia',
//   'Jack',
//   'Charlotte',
//   'Theodore',
//   'Isla',
//   'Oliver',
//   'Isabella',
//   'Jasper',
//   'Cora',
//   'Levi',
//   'Violet',
//   'Arthur',
//   'Mia',
//   'Thomas',
//   'Elizabeth',
// ];

// @Component({
//   selector: 'app-role-list',
//   templateUrl: './role-list.component.html',
//   styleUrls: ['./role-list.component.scss'],
//   providers: [RoleFacade],
// })
// export class RoleListComponent implements OnInit {
//   displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
//   dataSource: MatTableDataSource<UserData>;

//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;

//   constructor() {
//     // Create 100 users
//     const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

//     // Assign the data to the data source for the table to render
//     this.dataSource = new MatTableDataSource(users);
//   }

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
// }

// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
//   // columnDefinitions: Column[] = [];
//   // gridOptions!: GridOption;
//   // dataset!: Role[];

//   // constructor(private matDialog: MatDialog, private roleFacade: RoleFacade) {
//   //   this.columnDefinitions = [
//   //     {
//   //       id: 'edit',
//   //       field: 'id',
//   //       excludeFromHeaderMenu: true,
//   //       formatter: Formatters.editIcon,
//   //       minWidth: 30,
//   //       maxWidth: 30,
//   //       onCellClick: (e: Event, args: OnEventArgs) => {
//   //         this.editStat(args.dataContext);
//   //       },
//   //     },
//   //     {
//   //       id: 'delete',
//   //       field: 'id',
//   //       excludeFromColumnPicker: true,
//   //       excludeFromGridMenu: true,
//   //       excludeFromHeaderMenu: true,
//   //       formatter: Formatters.deleteIcon,
//   //       minWidth: 30,
//   //       maxWidth: 30,
//   //       onCellClick: (e: Event, args: OnEventArgs) => {
//   //         this.deleteStat(args.dataContext);
//   //       },
//   //     },
//   //     {
//   //       id: 'description',
//   //       name: 'Name',
//   //       field: 'description',
//   //       sortable: true,
//   //     },
//   //     {
//   //       id: 'code',
//   //       name: 'Created By',
//   //       field: 'code',
//   //       sortable: true,
//   //     },

//   //     {
//   //       id: 'owner',
//   //       name: 'Updated By',
//   //       field: 'owner.name',
//   //       formatter: Formatters.complexObject,
//   //       sortable: true,
//   //     },
//   //     {
//   //       id: 'owner',
//   //       name: 'Created Date',
//   //       field: 'owner.name',
//   //       formatter: Formatters.complexObject,
//   //       sortable: true,
//   //     },
//   //     {
//   //       id: 'owner',
//   //       name: 'Updated Date',
//   //       field: 'owner.name',
//   //       formatter: Formatters.complexObject,
//   //       sortable: true,
//   //     },
//   //   ];
//   //   this.gridOptions = {
//   //     enableAutoResize: true,
//   //     enableSorting: true,
//   //     enableGrouping: true,
//   //     // gridHeight: 225,
//   //     gridWidth: '100%',
//   //     enableCellNavigation: true,
//   //     enableRowSelection: true,
//   //     editable: false,
//   //     multiSelect: false,
//   //     rowSelectionOptions: {
//   //       selectActiveRow: true,
//   //     },
//   //     enableGridMenu: false,
//   //     enableHeaderMenu: false,
//   //     enableContextMenu: false,
//   //     enableCellMenu: false,
//   //   };
//   // }

//   // ngOnInit(): void {
//   //   this.roleFacade.goals$.subscribe((data) => (this.dataset = data));
//   // }

//   // addGoal() {
//   //   this.matDialog.open(RoleFormComponent, {
//   //     data: { update: false },
//   //   });
//   // }

//   // editStat(stat: Role) {
//   //   this.roleFacade.selectRole(stat);
//   //   this.matDialog.open(RoleFormComponent, {
//   //     data: { update: true },
//   //   });
//   // }

//   // deleteStat(stat: Role) {
//   //   const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent);

//   //   dialogRef.afterClosed().subscribe((result: boolean) => {
//   //     if (result && stat.id) {
//   //       this.roleFacade.deleteRole(stat.id);
//   //     }
//   //   });
//   // }
// }


import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RoleFacade } from '../../facades/role.facade';
import { Role } from '../../models/role.model';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete/confirm-delete-dialog/confirm-delete-dialog.component';
import { RoleFormComponent } from '../role-form/role-form.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface RoleData{
  id: string;
  name: string;
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
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
    providers: [RoleFacade],
})
export class RoleListComponent implements AfterViewInit {
  d_Colums: string[] = ['id', 'name', 'deleted', 'createdBy', 'updatedBy', 'deletedBy'];
  dSource!: MatTableDataSource<RoleData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private roleFacade: RoleFacade,
    private matDialog: MatDialog) {
    const roles = Array.from({length: 100}, (_, k) => createNewRole(k + 1));
    this.dSource = new MatTableDataSource(roles);
  }

  ngAfterViewInit() {
    this.dSource.paginator = this.paginator;
    this.dSource.sort = this.sort;
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

  addGoal() {
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

function createNewRole(id: number): RoleData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    deleted: false,
    createdBy: name,
    updatedBy: name,
    deletedBy: name,
  };
}

