import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SectorFacade } from 'src/app/sectors/facades/sector.facade';
import { Sector } from 'src/app/sectors/models/sector.model';
import { RoleFacade } from '../../facades/role.facade';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],

  providers: [SectorFacade,RoleFacade, RoleFacade],
})
export class RoleFormComponent implements OnInit {
  statForm: FormGroup;

  statToUpdate: Role | null = null;
  update: boolean = false;

  constructor(
    private fb: FormBuilder,
    private roleFacade: RoleFacade,
    public sectorFacade: SectorFacade,
    @Inject(MAT_DIALOG_DATA) private data: { update: boolean }
  ) {
    this.update = this.data.update;
    this.statForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      sector: ''
    });
  }

  ngOnInit(): void {
    if (this.update) {
      this.roleFacade.selectedRole$.subscribe((data) => {
        this.statToUpdate = data;
        this.statForm.patchValue({ ...this.statToUpdate });
      });
    }
  }

  save() {
    const { valid, touched, dirty } = this.statForm;
    if (valid && (touched || dirty)) {
      if (!this.update) {
        console.log({ ...this.statForm.value });
        this.roleFacade.addRole({
          ...this.statForm.value,
        });
      }

      if (this.update && this.statToUpdate?.id) {
        this.roleFacade.updateRole(this.statToUpdate?.id, {
          ...this.statForm.value,
        });
      }
    }
  }

  sectorComparator(sector1: Sector, sector2: Sector) {
    return sector1?.id === sector2?.id && sector1?.name === sector2?.name;
  }
}
