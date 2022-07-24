import { SectorListComponent } from './../sector-list/sector-list.component';
import { RoleFacade } from './../../../roles/facades/role.facade';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/roles/models/role.model';
import { OfficeFacade } from 'src/app/offices/facades/office.facade';
import { Office } from 'src/app/offices/models/office.model';
import { SectorFacade } from '../../facades/sector.facade';
import { Sector } from '../../models/sector.model';


@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.scss'],
  providers: [SectorFacade, RoleFacade, OfficeFacade, SectorListComponent],
})
export class SectorFormComponent implements OnInit {
  sectorForm: FormGroup;
  sectorToUpdate: Sector | null = null;
  update: boolean = false;
  constructor(
    public sectorFacade: SectorFacade,
    public sectorList: SectorListComponent,
    public roleFacade: RoleFacade,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { update: boolean }
  ) {
    this.update = this.data.update;
    this.sectorForm = this.fb.group({
      name: ['', Validators.required],
      role: '',
    });
  }

  ngOnInit(): void {
    if (this.update) {
      this.sectorFacade.selectedSector$.subscribe((data) => {
        this.sectorToUpdate = data;
        this.sectorForm.patchValue({ ...this.sectorToUpdate });
        console.log(this.sectorForm);
      });
    }
  }

  save() {
    const { valid, touched, dirty } = this.sectorForm;
    if (valid && (touched || dirty)) {
      if (!this.update) {
        console.log({ ...this.sectorForm.value});
        this.sectorFacade.addSector({
          ...this.sectorForm.value,
        });
      }

      if (this.update && this.sectorToUpdate?.id) {
        this.sectorFacade.updateSector(this.sectorToUpdate?.id, {
          ...this.sectorForm.value,
        });
      }
    }
  }
  roleComparator(role1: Role, role2: Role) {
    return role1?.id === role2?.id && role1?.name === role2?.name;
  }
}
