import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleFacade } from 'src/app/roles/facades/role.facade';
import { Role } from 'src/app/roles/models/role.model';
import { OfficeFacade } from 'src/app/offices/facades/office.facade';
import { Office } from 'src/app/offices/models/office.model';
import { SectorFacade } from '../../facades/sector.facade';
import { Sector } from '../../models/sector.model';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.scss'],
  providers: [SectorFacade, OfficeFacade, OfficeFacade],
})
export class SectorFormComponent implements OnInit {
  sectorForm: FormGroup;
  sectorToUpdate: Sector | null = null;
  update: boolean = false;
  constructor(
    public sectorFacade: SectorFacade,
    private fb: FormBuilder,
    public officeFacade: OfficeFacade,
    public roleFacade: RoleFacade,
    @Inject(MAT_DIALOG_DATA) private data: { update: boolean }
  ) {
    this.update = this.data.update;
    this.sectorForm = this.fb.group({
      description: ['', Validators.required],
      goal: ['', Validators.required],
      owner: '',
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
        let owner= this.sectorForm.get('owner')?.value
          ? this.sectorForm.get('owner')?.value
          : [];
        console.log({ ...this.sectorForm.value, owner });
        this.sectorFacade.addSector({
          ...this.sectorForm.value,
          owner,
        });
      }

      if (this.update && this.sectorToUpdate?.id) {
        this.sectorFacade.updateSector(this.sectorToUpdate?.id, {
          ...this.sectorForm.value,
        });
      }
    }
  }
  goalComparator(role1: Role, role2: Role) {
    return (

      role1.id === role2.id &&
      role1.description === role2.description &&
      role1.owner?.name == role2.owner?.name
    );
  }
  officeComparator(office1: Office, office2: Office) {
    return (
      office1.id === office2.id &&
      office1.name === office2.name &&
      office1.location == office2.location
    );
  }
}
